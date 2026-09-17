/**
 * UrbanQuest — site behaviour.
 * Plain ES2020, no framework, no build step. Reads content from projects.js.
 */
;(function () {
    'use strict'

    /* ── CONTACT FORM ENDPOINT ────────────────────────────────────────────────
       Formspree delivers submissions to whichever address the form is set to
       in their dashboard (glen@urbanquestinc.com). Create the form there, then
       paste its id below — the dashboard URL ends in it, e.g.
       https://formspree.io/f/abcdwxyz  ->  FORM_ID = 'abcdwxyz'

       While this is still the placeholder the form refuses to claim it sent
       anything, and points people at the email address instead. That is
       deliberate: silently swallowing an enquiry while saying "thank you" is
       worse than having no form at all. */
    const FORM_ID = 'xbgljwne'
    const FORM_ENDPOINT = `https://formspree.io/f/${FORM_ID}`
    const FORM_CONFIGURED = FORM_ID !== 'YOUR_FORM_ID'
    const CONTACT_EMAIL = 'glen@urbanquestinc.com'

    const $ = (sel) => document.querySelector(sel)
    const $$ = (sel) => Array.from(document.querySelectorAll(sel))

    /* An entry in PROJECTS[].images is either a plain path or an object
       carrying framing overrides. The overlay pane is portrait, so `cover`
       crops the sides off landscape frames — `position` re-aims that crop and
       `fit: 'contain'` opts a shot out of it entirely when the full frame is
       the point. Normalised here so the rest of the code sees one shape. */
    const frame = (entry) =>
        typeof entry === 'string' ? { src: entry } : entry
    const srcOf = (entry) => frame(entry).src

    /* "a", "a and b", "a, b, and c" — so validation messages read as a
       sentence instead of a comma-separated dump. */
    function listToSentence(items) {
        if (items.length <= 1) return items[0] || ''
        if (items.length === 2) return `${items[0]} and ${items[1]}`
        return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
    }

    /* Grid cards default to filling their box. A card can opt out via
       `thumb: { src, fit, position }` — used where cropping to fill would cut
       into artwork that needs to be seen whole. */
    function cardFraming(project) {
        const shot = frame(project.thumb || project.images[0])
        return [
            shot.fit ? `object-fit:${shot.fit}` : '',
            shot.position ? `object-position:${shot.position}` : '',
        ]
            .filter(Boolean)
            .join(';')
    }

    /* ── MARQUEE ──────────────────────────────────────────────────────────────
       The strip is duplicated because the keyframe translates -50%: the second
       copy slides in exactly as the first leaves, so the loop has no seam. */
    function initMarquee() {
        const inner = $('#marqueeInner')
        if (!inner) return

        // The separator is drawn by CSS as a hairline rule, so the span is
        // deliberately empty — there is no glyph to read out. The whole strip
        // is aria-hidden anyway; it is decoration, and the words repeat.
        const html = MARQUEE_ITEMS.map(
            (item) => `<span class="marquee-item">${item}</span><span class="marquee-dot"></span>`
        ).join('')
        inner.innerHTML = html + html
    }

    /* ── HERO SLIDESHOW ── */
    function initSlideshow() {
        const slideWrap = $('#heroSlides')
        const dotWrap = $('#heroDots')
        if (!slideWrap || !dotWrap || !HERO_IMAGES.length) return

        // Built from HERO_IMAGES rather than hard-coded, so the curated set can
        // grow or shrink without the dots falling out of sync with the slides.
        slideWrap.innerHTML = HERO_IMAGES.map(
            (img, i) =>
                `<div class="hero-slide${i === 0 ? ' active' : ''}" role="img" aria-label="${img.alt}"
                      style="background-image:url('${img.src}'); background-position:${img.position};"></div>`
        ).join('')

        dotWrap.innerHTML = HERO_IMAGES.map(
            (img, i) =>
                `<button class="hero-dot${i === 0 ? ' active' : ''}" data-idx="${i}" role="tab"
                         aria-label="${img.alt}" aria-selected="${i === 0}"></button>`
        ).join('')

        const slides = $$('.hero-slide')
        const dots = $$('.hero-dot')
        if (slides.length < 2) return

        let current = 0
        let timer = null

        function goTo(idx) {
            slides[current].classList.remove('active')
            dots[current].classList.remove('active')
            dots[current].setAttribute('aria-selected', 'false')

            current = idx

            slides[current].classList.add('active')
            dots[current].classList.add('active')
            dots[current].setAttribute('aria-selected', 'true')
        }

        const next = () => goTo((current + 1) % slides.length)
        const start = () => {
            timer = window.setInterval(next, 5500)
        }
        const stop = () => window.clearInterval(timer)

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                stop()
                goTo(Number(dot.dataset.idx))
                start()
            })
        })

        // Don't burn cycles animating a slideshow nobody is looking at.
        document.addEventListener('visibilitychange', () => {
            document.hidden ? stop() : start()
        })

        start()
    }

    /* ── APPROACH SLIDESHOW ──────────────────────────────────────────────────
       Same behaviour as the hero: cross-fade on a timer, with dots that jump
       to a slide and restart the clock. Slides and dots are both built from
       APPROACH_IMAGES, so the two can never fall out of sync. */
    function initApproachSlideshow() {
        const wrap = $('#aboutSlides')
        const dotWrap = $('#aboutDots')
        if (!wrap || typeof APPROACH_IMAGES === 'undefined' || !APPROACH_IMAGES.length) return

        wrap.innerHTML = APPROACH_IMAGES.map(
            (img, i) =>
                `<img class="about-slide${i === 0 ? ' active' : ''}" src="${img.src}"
                      alt="${img.alt}" loading="lazy"
                      ${img.position ? `style="object-position:${img.position}"` : ''}>`
        ).join('')

        if (dotWrap) {
            dotWrap.innerHTML = APPROACH_IMAGES.map(
                (img, i) =>
                    `<button class="about-dot${i === 0 ? ' active' : ''}" data-idx="${i}" role="tab"
                             aria-label="${img.alt}" aria-selected="${i === 0}"></button>`
            ).join('')
        }

        const slides = $$('.about-slide')
        const dots = $$('.about-dot')
        if (slides.length < 2) return

        let current = 0
        let timer = null

        function goTo(idx) {
            slides[current].classList.remove('active')
            if (dots[current]) {
                dots[current].classList.remove('active')
                dots[current].setAttribute('aria-selected', 'false')
            }

            current = idx

            slides[current].classList.add('active')
            if (dots[current]) {
                dots[current].classList.add('active')
                dots[current].setAttribute('aria-selected', 'true')
            }
        }

        const next = () => goTo((current + 1) % slides.length)
        const start = () => {
            // Slower than the hero: this sits beside body copy, so a frame
            // needs to hold long enough to be read past rather than pulling
            // the eye back every few seconds. Also keeps the two slideshows
            // out of lockstep.
            timer = window.setInterval(next, 9000)
        }
        const stop = () => window.clearInterval(timer)

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                stop()
                goTo(Number(dot.dataset.idx))
                start()
            })
        })

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stop() : start()
        })

        start()
    }

    /* ── PORTFOLIO GRID ── */
    function initPortfolio() {
        const grid = $('#portfolioGrid')
        if (!grid) return

        grid.innerHTML = PROJECTS.map(
            (p) => `
            <button class="proj-card reveal" data-id="${p.id}"
                    aria-label="View project: ${p.name}">
              <img class="proj-card-img${p.tone ? ` tone-${p.tone}` : ''}" src="${srcOf(p.thumb || p.images[0])}" alt="${p.name}" loading="lazy"
                   style="${cardFraming(p)}">
              <span class="proj-card-overlay"></span>
              <span class="proj-card-info">
                <span class="proj-tag">${p.tag}</span>
                <span class="proj-name">${p.name}</span>
                <span class="proj-location">${p.location}</span>
              </span>
              <span class="proj-arrow">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5">
                  <line x1="2" y1="13" x2="13" y2="2"/><polyline points="5,2 13,2 13,10"/>
                </svg>
              </span>
            </button>`
        ).join('')

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.proj-card')
            if (!card) return
            const project = PROJECTS.find((p) => p.id === Number(card.dataset.id))
            if (project) openOverlay(project, card)
        })
    }

    /* ── PROJECT OVERLAY ── */
    const overlay = {
        el: null,
        pane: null,
        slide: 0,
        count: 0,
        lastFocus: null,
    }

    function openOverlay(project, trigger) {
        const el = $('#overlay')
        const pane = $('#overlayImgPane')
        const inner = el.querySelector('.overlay-inner')
        if (!el || !pane) return

        overlay.el = el
        overlay.pane = pane
        overlay.slide = 0
        overlay.count = project.images.length
        overlay.lastFocus = trigger || null

        $('#overlayTag').textContent = project.tag
        $('#overlayTitle').textContent = project.name
        $('#overlayLocation').textContent = project.location
        $('#overlayDesc').textContent = project.desc
        $('#specHomes').textContent = project.homes
        $('#specStatus').textContent = project.status
        $('#specYear').textContent = project.year

        // Rebuild the carousel: drop old <img>s, keep the chrome (arrows, dots).
        // Build into a fragment and prepend once — prepending in a loop would
        // reverse the images, leaving updateCarousel() pointing at the wrong one.
        pane.querySelectorAll('.overlay-carousel-img').forEach((n) => n.remove())
        const frag = document.createDocumentFragment()
        project.images.forEach((entry, i) => {
            const shot = frame(entry)
            const img = document.createElement('img')
            img.className =
                'overlay-carousel-img' +
                (i === 0 ? ' active' : '') +
                (project.tone ? ` tone-${project.tone}` : '')
            img.src = shot.src
            if (shot.fit) img.style.objectFit = shot.fit
            if (shot.position) img.style.objectPosition = shot.position
            img.alt = `${project.name}, view ${i + 1}`
            frag.appendChild(img)
        })
        pane.prepend(frag)

        $('#carouselDots').innerHTML = project.images
            .map(
                (_, i) =>
                    `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="View image ${i + 1} of ${project.images.length}"></button>`
            )
            .join('')

        inner.classList.toggle('single-image', overlay.count < 2)
        $('#carouselTotal').textContent = String(overlay.count).padStart(2, '0')
        updateCarousel()

        el.hidden = false
        // Force a reflow so the opacity transition runs from the hidden state.
        void el.offsetWidth
        el.classList.add('open')
        document.body.style.overflow = 'hidden'
        $('#overlayClose').focus()
    }

    function closeOverlay() {
        const el = overlay.el
        if (!el) return

        el.classList.remove('open')
        document.body.style.overflow = ''

        // Wait out the fade before hiding, or the close is abrupt.
        window.setTimeout(() => {
            el.hidden = true
        }, 450)

        if (overlay.lastFocus) overlay.lastFocus.focus()
        overlay.el = null
    }

    function goSlide(dir) {
        if (!overlay.el || overlay.count < 2) return
        overlay.slide = (overlay.slide + dir + overlay.count) % overlay.count
        updateCarousel()
    }

    function updateCarousel() {
        const imgs = overlay.pane.querySelectorAll('.overlay-carousel-img')
        const dots = $('#carouselDots').querySelectorAll('.carousel-dot')

        imgs.forEach((img, i) => img.classList.toggle('active', i === overlay.slide))
        dots.forEach((dot, i) => dot.classList.toggle('active', i === overlay.slide))
        $('#carouselCurrent').textContent = String(overlay.slide + 1).padStart(2, '0')
    }

    function initOverlay() {
        $('#overlayClose').addEventListener('click', closeOverlay)
        $('#carouselPrev').addEventListener('click', () => goSlide(-1))
        $('#carouselNext').addEventListener('click', () => goSlide(1))

        $('#carouselDots').addEventListener('click', (e) => {
            const dot = e.target.closest('.carousel-dot')
            if (!dot) return
            overlay.slide = Number(dot.dataset.idx)
            updateCarousel()
        })

        // Click the backdrop (but not the content) to dismiss.
        $('#overlay').addEventListener('click', (e) => {
            if (e.target === $('#overlay')) closeOverlay()
        })

        window.addEventListener('keydown', (e) => {
            if (!overlay.el) return
            if (e.key === 'Escape') closeOverlay()
            if (e.key === 'ArrowRight') goSlide(1)
            if (e.key === 'ArrowLeft') goSlide(-1)
        })
    }

    /* ── NAV ── */
    function initNav() {
        const nav = $('#mainNav')
        const toggle = $('#navToggle')
        const links = $('#navLinks')

        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()

        function setMenu(open) {
            links.classList.toggle('open', open)
            toggle.setAttribute('aria-expanded', String(open))
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
            document.body.style.overflow = open ? 'hidden' : ''
        }

        toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')))
        links.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') setMenu(false)
        })
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && links.classList.contains('open')) setMenu(false)
        })
        // Leaving the mobile breakpoint with the drawer open would lock scroll.
        window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
            if (e.matches) setMenu(false)
        })

        $('#navEnquire').addEventListener('click', () => {
            $('#contact').scrollIntoView({ behavior: 'smooth' })
        })
        $('#heroWorkBtn').addEventListener('click', () => {
            $('#portfolio').scrollIntoView({ behavior: 'smooth' })
        })
    }

    /* ── SCROLL REVEALS ── */
    function initReveals() {
        const els = $$('.reveal, .reveal-left, .reveal-right')
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    entry.target.classList.add('visible')
                    obs.unobserve(entry.target)
                })
            },
            { threshold: 0.07 }
        )
        els.forEach((el) => obs.observe(el))
    }

    /* ── CONTACT FORM ──────────────────────────────────────────────────────────
       No backend yet — this validates and fakes a send. Wire the submit handler
       to a real endpoint (Formspree, Netlify Forms, or an API route) before launch. */
    function initContactForm() {
        const form = $('#contactForm')
        const status = $('#formStatus')
        const submit = form.querySelector('.form-submit')

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            if (!form.checkValidity()) {
                // Name what is missing rather than saying "required fields":
                // the person then knows where to look without hunting the form
                // for the browser's own outline.
                const missing = Array.from(form.querySelectorAll('.form-input'))
                    .filter((field) => !field.checkValidity())
                    .map((field) => {
                        const label = form.querySelector(`label[for="${field.id}"]`)
                        return label ? label.textContent.toLowerCase() : field.name
                    })

                // Naming one or two missing fields helps. Naming four just
                // restates the empty form, so past that say it plainly. No
                // "marked below" either: the browser only outlines the first
                // invalid field, so the phrase promised more than it delivered.
                status.textContent = !missing.length
                    ? 'Something in the form needs another look before this can send.'
                    : missing.length > 2
                      ? 'A few details are missing.'
                      : `Add your ${listToSentence(missing)} and we'll send this through.`
                status.classList.add('error')
                form.reportValidity()
                return
            }

            // Refuse to fake it. Without an endpoint there is nowhere for this
            // to go, so say so rather than showing a thank-you.
            if (!FORM_CONFIGURED) {
                status.innerHTML =
                    `The form isn't connected yet. Please email ` +
                    `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> directly.`
                status.classList.add('error')
                return
            }

            status.textContent = ''
            status.classList.remove('error')
            submit.disabled = true
            submit.textContent = 'Sending your enquiry…'

            sendEnquiry(form)
                .then(() => {
                    form.innerHTML = `
                    <div class="form-sent">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                           stroke="currentColor" stroke-width="1.5"><polyline points="2,9 7,14 16,4"/></svg>
                      Thank you. We'll be in touch.
                    </div>`
                })
                .catch((err) => {
                    // Never lose the enquiry silently: if the request failed,
                    // the message is still in the fields, and the fallback is
                    // an address they can use right now.
                    status.innerHTML =
                        `${err.message} Your message is still here, or email ` +
                        `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
                    status.classList.add('error')
                    submit.disabled = false
                    submit.textContent = 'Send enquiry'
                })
        })
    }

    /* POSTs the form to Formspree. `Accept: application/json` is what stops
       Formspree replying with its own redirect page, so the visitor stays on
       the site and we control the confirmation. */
    async function sendEnquiry(form) {
        let res
        try {
            res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form),
            })
        } catch {
            throw new Error("That didn't send, likely a connection problem.")
        }

        if (res.ok) return

        // Formspree returns its own reasons (inactive form, monthly limit
        // reached, blocked as spam); surface the first rather than a generic
        // failure, since they need different fixes.
        let detail = ''
        try {
            const body = await res.json()
            detail = (body.errors && body.errors[0] && body.errors[0].message) || ''
        } catch {
            /* no JSON body — fall through to the generic message */
        }
        throw new Error(detail ? `${detail}.` : "That didn't send.")
    }

    /* ── COPY EMAIL ── */
    function initCopyEmail() {
        const btn = $('#copyEmailBtn')
        const link = $('#contactEmail')
        const toast = $('#copyToast')
        if (!btn || !link || !toast) return

        let timer = null

        async function copy(text) {
            // The async clipboard API needs a secure context, so it is absent
            // on plain http:// — fall back to a throwaway selection copy.
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text)
                return
            }
            const scratch = document.createElement('textarea')
            scratch.value = text
            scratch.setAttribute('readonly', '')
            scratch.style.position = 'fixed'
            scratch.style.opacity = '0'
            document.body.appendChild(scratch)
            scratch.select()
            document.execCommand('copy')
            scratch.remove()
        }

        btn.addEventListener('click', async () => {
            try {
                await copy(link.textContent.trim())
                toast.textContent = 'Email copied'
            } catch {
                toast.textContent = 'Copy blocked, select the address'
            }
            toast.classList.add('show')
            window.clearTimeout(timer)
            timer = window.setTimeout(() => toast.classList.remove('show'), 1800)
        })
    }

    /* ── BOOT ── */
    document.addEventListener('DOMContentLoaded', () => {
        initMarquee()
        initSlideshow()
        initApproachSlideshow()
        initPortfolio()
        initOverlay()
        initNav()
        initContactForm()
        initCopyEmail()
        initReveals() // last — the portfolio cards must exist to be observed
    })
})()

/**
 * UrbanQuest — site behaviour.
 * Plain ES2020, no framework, no build step. Reads content from projects.js.
 */
;(function () {
    'use strict'

    const $ = (sel) => document.querySelector(sel)
    const $$ = (sel) => Array.from(document.querySelectorAll(sel))

    /* ── MARQUEE ──────────────────────────────────────────────────────────────
       The strip is duplicated because the keyframe translates -50%: the second
       copy slides in exactly as the first leaves, so the loop has no seam. */
    function initMarquee() {
        const inner = $('#marqueeInner')
        if (!inner) return

        const html = MARQUEE_ITEMS.map(
            (item) => `<span class="marquee-item">${item}</span><span class="marquee-dot">◆</span>`
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

    /* ── PORTFOLIO GRID ── */
    function initPortfolio() {
        const grid = $('#portfolioGrid')
        if (!grid) return

        grid.innerHTML = PROJECTS.map(
            (p) => `
            <button class="proj-card reveal" data-id="${p.id}"
                    aria-label="View project — ${p.name}">
              <img class="proj-card-img${p.tone ? ` tone-${p.tone}` : ''}" src="${p.images[0]}" alt="${p.name}" loading="lazy">
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
        $('#specUnits').textContent = project.units
        $('#specSqft').textContent = project.sqft
        $('#specStatus').textContent = project.status
        $('#specYear').textContent = project.year

        // Rebuild the carousel: drop old <img>s, keep the chrome (arrows, dots).
        // Build into a fragment and prepend once — prepending in a loop would
        // reverse the images, leaving updateCarousel() pointing at the wrong one.
        pane.querySelectorAll('.overlay-carousel-img').forEach((n) => n.remove())
        const frag = document.createDocumentFragment()
        project.images.forEach((src, i) => {
            const img = document.createElement('img')
            img.className =
                'overlay-carousel-img' +
                (i === 0 ? ' active' : '') +
                (project.tone ? ` tone-${project.tone}` : '')
            img.src = src
            img.alt = `${project.name} — view ${i + 1}`
            frag.appendChild(img)
        })
        pane.prepend(frag)

        $('#carouselDots').innerHTML = project.images
            .map(
                (_, i) =>
                    `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="View ${i + 1}"></button>`
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
                status.textContent = 'Fill in the required fields before sending.'
                status.classList.add('error')
                form.reportValidity()
                return
            }

            status.textContent = ''
            status.classList.remove('error')
            submit.disabled = true
            submit.textContent = 'Sending…'

            // TODO: replace with a real POST once an endpoint exists.
            window.setTimeout(() => {
                form.innerHTML = `
                    <div class="form-sent">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                           stroke="currentColor" stroke-width="1.5"><polyline points="2,9 7,14 16,4"/></svg>
                      Thank you — we'll be in touch within 48 hours.
                    </div>`
            }, 1000)
        })
    }

    /* ── BOOT ── */
    document.addEventListener('DOMContentLoaded', () => {
        initMarquee()
        initSlideshow()
        initPortfolio()
        initOverlay()
        initNav()
        initContactForm()
        initReveals() // last — the portfolio cards must exist to be observed
    })
})()

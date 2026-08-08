/**
 * Baby Name Reveal - South Indian Nāmakaraṇa Logic
 */

let songIsPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Configuration
    const config = window.BabyRevealConfig;

    // DOM References
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownView = document.getElementById('countdown-view');
    const revealView = document.getElementById('reveal-view');
    
    const revealedNameEl = document.getElementById('revealed-name');
    const revealedGenderEl = document.getElementById('revealed-gender');
    const nameMeaningEl = document.getElementById('name-meaning');
    const nakshatraValueEl = document.getElementById('nakshatra-value');
    const etymologyValueEl = document.getElementById('etymology-value');
    
    const parentNamesEl = document.getElementById('parent-names');
    const heroTitleEl = document.getElementById('hero-title');
    const heroSubtitleEl = document.getElementById('hero-subtitle');
    const ceremonyLabelEl = document.getElementById('ceremony-label');
    const revealDateDisplay = document.getElementById('reveal-date-display');
    const heroBannerImg = document.getElementById('hero-banner-img');
    
    const themeBtn = document.getElementById('theme-btn');
    const soundBtn = document.getElementById('sound-btn');
    const langBtn = document.getElementById('lang-btn');
    
    const secretTrigger = document.getElementById('secret-trigger');
    const secretModal = document.getElementById('secret-modal');
    const secretInput = document.getElementById('secret-input');
    const secretSubmitBtn = document.getElementById('secret-submit');
    const modalCloseBtn = document.getElementById('modal-close');

    // State Variables
    let soundEnabled = true;
    let isRevealed = false;
    let countdownInterval = null;
    let currentLang = 'en'; // 'en' or 'te'

    // 2. Populate Config Content
    if (parentNamesEl) {
        parentNamesEl.setAttribute('data-en', config.parentNames);
        parentNamesEl.setAttribute('data-te', config.parentNamesTelugu || config.parentNames);
        parentNamesEl.innerHTML = config.parentNames;
    }
    if (heroTitleEl) {
        heroTitleEl.setAttribute('data-en', config.babyTitle);
        heroTitleEl.setAttribute('data-te', config.babyTitleTelugu || config.babyTitle);
        heroTitleEl.textContent = config.babyTitle;
    }
    if (heroBannerImg && config.heroImageMystery) heroBannerImg.src = config.heroImageMystery;

    // Format Target Date
    // If the date string doesn't have a timezone (e.g. Z or +05:30), it is parsed in the user's local timezone.
    const targetDate = new Date(config.revealDate);
    if (revealDateDisplay) {
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        revealDateDisplay.textContent = targetDate.toLocaleDateString('en-US', options);
    }

    // Location Setup
    const locationBtn = document.getElementById('event-location-btn');
    const addressEl = document.getElementById('event-address');
    if (locationBtn && config.eventLocationUrl) {
        locationBtn.href = config.eventLocationUrl;
        if (addressEl && config.eventAddress) {
            addressEl.textContent = config.eventAddress;
        }
    } else if (locationBtn) {
        locationBtn.style.display = 'none';
        if (addressEl) addressEl.style.display = 'none';
    }

    // 3. Theme Toggle Setup
    const themes = ['rose', 'temple', 'silk', 'jasmine'];
    const themeIcons = ['🌸', '🏛️', '🦚', '🌼'];
    let currentThemeIndex = themes.indexOf(config.defaultTheme) !== -1 ? themes.indexOf(config.defaultTheme) : 0;
    
    function applyTheme(index) {
        document.body.className = `theme-${themes[index]}`;
        if (themeBtn) themeBtn.textContent = themeIcons[index];
    }
    applyTheme(currentThemeIndex);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(currentThemeIndex);
        });
    }

    // 4. Language Toggle Setup
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-en][data-te]');
        elements.forEach(el => {
            el.innerHTML = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-te');
        });
        langBtn.textContent = currentLang === 'en' ? 'తె' : 'EN';
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'te' : 'en';
            updateLanguage();
        });
    }

    // 5. Countdown Timer Engine
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            triggerReveal();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // 6. Reveal Engine
    function triggerReveal() {
        if (isRevealed) return;
        isRevealed = true;

        if (countdownView) countdownView.style.display = 'none';
        if (revealView) revealView.style.display = 'block';

        // Update Reveal Details
        if (revealedNameEl) {
            revealedNameEl.setAttribute('data-en', config.babyName);
            revealedNameEl.setAttribute('data-te', config.babyNameTelugu || config.babyName);
            revealedNameEl.textContent = currentLang === 'en' ? config.babyName : (config.babyNameTelugu || config.babyName);
        }
        if (revealedGenderEl) {
            revealedGenderEl.setAttribute('data-en', `It's a ${config.babyGender}! 💕`);
            revealedGenderEl.setAttribute('data-te', `ఇది ఒక ${config.babyGender === 'Girl' ? 'అమ్మాయి' : 'అబ్బాయి'}! 💕`);
            revealedGenderEl.textContent = currentLang === 'en' ? `It's a ${config.babyGender}! 💕` : `ఇది ఒక ${config.babyGender === 'Girl' ? 'అమ్మాయి' : 'అబ్బాయి'}! 💕`;
        }
        if (nameMeaningEl) {
            nameMeaningEl.setAttribute('data-en', config.nameMeaning);
            nameMeaningEl.setAttribute('data-te', config.nameMeaningTelugu || config.nameMeaning);
            nameMeaningEl.textContent = currentLang === 'en' ? config.nameMeaning : (config.nameMeaningTelugu || config.nameMeaning);
        }
        
        if (nakshatraValueEl) {
            nakshatraValueEl.textContent = `${config.nakshatra} • ${config.nakshatraTelugu}`;
        }
        if (etymologyValueEl) {
            etymologyValueEl.setAttribute('data-en', config.nameEtymology);
            etymologyValueEl.setAttribute('data-te', config.nameEtymologyTelugu || config.nameEtymology);
            etymologyValueEl.textContent = currentLang === 'en' ? config.nameEtymology : (config.nameEtymologyTelugu || config.nameEtymology);
        }
        
        // Hide irrelevant elements post-reveal
        if (heroSubtitleEl) heroSubtitleEl.style.display = 'none';
        if (ceremonyLabelEl) ceremonyLabelEl.style.display = 'none';
        const datePill = document.querySelector('.date-pill');
        if (datePill) datePill.style.display = 'none';

        // Swap Hero Image
        if (heroBannerImg && config.heroImageReveal) {
            heroBannerImg.style.opacity = 0;
            setTimeout(() => {
                heroBannerImg.src = config.heroImageReveal;
                heroBannerImg.style.opacity = 1;
            }, 300);
        }

        if (soundEnabled) {
            playCarnaticChime();
        }

        launchMarigoldConfetti();
    }

    // 7. Web Audio API - Carnatic Chime
    function playCarnaticChime() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            // Carnatic scale approximation: Sa Ri Ga Ma Pa Da Ni Sa
            const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
                gain.gain.setValueAtTime(0.4, ctx.currentTime + index * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.15 + 1.0);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(ctx.currentTime + index * 0.15);
                osc.stop(ctx.currentTime + index * 0.15 + 1.1);
            });
        } catch (e) {
            console.log('Audio playback prevented', e);
        }
    }

    const bgAudio = document.getElementById('bg-audio');
    let hasInteracted = false;

    // Start BG audio on first interaction
    document.addEventListener('click', () => {
        if (!hasInteracted && soundEnabled && bgAudio && !songIsPlaying) {
            bgAudio.volume = config.bgVolume !== undefined ? config.bgVolume : 0.2;
            bgAudio.play().catch(e => console.log('BG audio play prevented', e));
            hasInteracted = true;
        }
    }, { once: true });

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundBtn.textContent = soundEnabled ? '🎵' : '🔇';
            
            if (bgAudio) {
                if (soundEnabled && !songIsPlaying && hasInteracted) {
                    bgAudio.play().catch(e => {});
                } else {
                    bgAudio.pause();
                }
            }
            
            const bujjiAudio = document.getElementById('bujji-audio');
            if (bujjiAudio && !soundEnabled && songIsPlaying) {
                const playBtn  = document.getElementById('song-play-btn');
                const playIcon = document.getElementById('play-icon');
                const btnLabel = document.getElementById('song-btn-label');
                
                bujjiAudio.pause();
                songIsPlaying = false;
                if (playIcon) playIcon.textContent = '▶';
                if (btnLabel) btnLabel.textContent = 'Play My Favourite Song';
                if (playBtn) playBtn.classList.remove('is-playing');
            }
        });
    }

    // 8. Marigold Confetti
    function launchMarigoldConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#f4900c', '#d4891a', '#c0392b', '#f5c842']; // Marigold, gold, kumkum

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 6 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 3 + 2,
                speedX: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 8,
                shape: Math.random() > 0.5 ? 'petal' : 'circle'
            });
        }

        let animationFrame;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;

            particles.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;

                if (p.y < canvas.height) active = true;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                
                if (p.shape === 'petal') {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
            });

            if (active) {
                animationFrame = requestAnimationFrame(animate);
            }
        }
        animate();
    }

    // 9. Kolam Dot Grid Background
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        const pCtx = particleCanvas.getContext('2d');
        
        function resizeCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let time = 0;
        function drawKolam() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            time += 0.01;
            
            const spacing = 40;
            const cols = Math.ceil(particleCanvas.width / spacing);
            const rows = Math.ceil(particleCanvas.height / spacing);
            
            pCtx.fillStyle = 'rgba(212, 137, 26, 0.3)'; // Gold dots
            
            for(let i=0; i<=cols; i++) {
                for(let j=0; j<=rows; j++) {
                    // Create subtle wave movement
                    const offsetX = Math.sin(time + j * 0.2) * 5;
                    const offsetY = Math.cos(time + i * 0.2) * 5;
                    
                    pCtx.beginPath();
                    pCtx.arc(i * spacing + offsetX, j * spacing + offsetY, 1.5, 0, Math.PI * 2);
                    pCtx.fill();
                }
            }
            requestAnimationFrame(drawKolam);
        }
        drawKolam();
    }

    // 10. Secret Code & Keyboard Bypass (Shift + P)
    function openSecretModal() {
        if (secretModal) secretModal.style.display = 'flex';
        if (secretInput) secretInput.focus();
    }

    function closeSecretModal() {
        if (secretModal) secretModal.style.display = 'none';
        if (secretInput) secretInput.value = '';
    }

    if (secretTrigger) secretTrigger.addEventListener('click', openSecretModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSecretModal);

    if (secretSubmitBtn) {
        secretSubmitBtn.addEventListener('click', () => {
            if (secretInput && secretInput.value.trim() === config.secretCode) {
                closeSecretModal();
                triggerReveal();
            } else {
                alert('Incorrect secret code. Try again!');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
            triggerReveal();
        }
    });

    /* ==========================================================================
       Bujji Meka — Native HTML5 Audio Player
       ========================================================================== */
    const playBtn  = document.getElementById('song-play-btn');
    const playIcon = document.getElementById('play-icon');
    const btnLabel = document.getElementById('song-btn-label');
    const audio    = document.getElementById('bujji-audio');
    
    if (audio) {
        audio.volume = config.songVolume !== undefined ? config.songVolume : 1.0;
    }

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                if (bgAudio) bgAudio.pause();
                audio.play().then(() => {
                    songIsPlaying = true;
                    if (playIcon) playIcon.textContent = '⏸';
                    if (btnLabel) btnLabel.textContent = 'Pause Song';
                    playBtn.classList.add('is-playing');
                    if (!soundEnabled && soundBtn) {
                        soundEnabled = true;
                        soundBtn.textContent = '🎵';
                    }
                }).catch(err => {
                    console.warn('Audio play failed:', err);
                });
            } else {
                audio.pause();
                songIsPlaying = false;
                if (playIcon) playIcon.textContent = '▶';
                if (btnLabel) btnLabel.textContent = 'Play My Favourite Song';
                playBtn.classList.remove('is-playing');
                if (soundEnabled && bgAudio) {
                    bgAudio.play().catch(e => {});
                }
            }
        });

        audio.addEventListener('ended', () => {
            songIsPlaying = false;
            if (playIcon) playIcon.textContent = '▶';
            if (btnLabel) btnLabel.textContent = 'Play My Favourite Song';
            playBtn.classList.remove('is-playing');
            if (soundEnabled && bgAudio) {
                bgAudio.play().catch(e => {});
            }
        });
    }
});

/* ==========================================================================
   Baby's World — Likes & Dislikes Renderer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const config = window.BabyRevealConfig;
    if (!config) return;

    const likesList    = document.getElementById('likes-list');
    const dislikesList = document.getElementById('dislikes-list');

    function buildItems(list, items, type) {
        if (!list || !items || !items.length) return;
        list.innerHTML = '';
        items.forEach((item, i) => {
            const li = document.createElement('li');
            li.className = `pref-item pref-item--${type}`;
            li.style.animationDelay = `${i * 0.12}s`;
            li.innerHTML = `
                <span class="pref-emoji">${item.emoji}</span>
                <span class="pref-text">${item.text}</span>
            `;
            list.appendChild(li);
        });
    }

    buildItems(likesList,    config.babyLikes,    'like');
    buildItems(dislikesList, config.babyDislikes, 'dislike');

    // Intersection Observer: animate items when section scrolls into view
    const section = document.getElementById('baby-world-section');
    if (section && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add('in-view');
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(section);
    }
});

/* ==========================================================================
   Baby Footprints — Natural Scroll Trail
   ========================================================================== */

(function () {
    // Authentic vector path for a realistic baby foot (left foot; right foot mirrored via CSS scaleX)
    const FOOT_SVG = `<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Baby foot sole curve -->
        <path fill="rgba(255, 182, 193, 0.6)" d="M 20 56 C 12 56 9 46 11 36 C 13 26 9 19 15 13 C 20 8 28 10 32 16 C 36 22 34 33 32 41 C 30 50 26 56 20 56 Z"/>
        <!-- Cute heart in the middle -->
        <path fill="rgba(255, 105, 180, 0.7)" d="M 20 38 C 17 35 15 32 15 29 C 15 25 20 22 20 25 C 20 22 25 25 25 29 C 25 32 23 35 20 38 Z" />
        <!-- Toes -->
        <circle fill="rgba(255, 182, 193, 0.6)" cx="9"  cy="9"  r="4.5"/>
        <circle fill="rgba(255, 182, 193, 0.6)" cx="17" cy="5"  r="3.6"/>
        <circle fill="rgba(255, 182, 193, 0.6)" cx="24" cy="6"  r="3.2"/>
        <circle fill="rgba(255, 182, 193, 0.6)" cx="30" cy="10" r="2.8"/>
        <circle fill="rgba(255, 182, 193, 0.6)" cx="34" cy="16" r="2.4"/>
    </svg>`;

    const STEP_PX       = 240;  // scroll pixels between each footprint (gentle pace)
    const LINGER_MS     = 2000; // time footprint stays visible
    const FADE_MS       = 700;  // fade-out duration
    const MAX_PRINTS    = 8;    // subtle limit to avoid screen clutter

    let lastScrollY     = window.scrollY;
    let accumulated     = 0;
    let stepIndex       = 0;
    let activeCount     = 0;
    let ticking         = false;

    function spawnFootprint(scrollY) {
        if (activeCount >= MAX_PRINTS) return;

        const isLeft   = stepIndex % 2 === 0;
        const side     = isLeft ? 'left' : 'right';
        const rotate   = isLeft
            ? (-16 + Math.random() * 8) + 'deg'   // gentle left foot angle
            : (16  - Math.random() * 8) + 'deg';  // gentle right foot angle

        // Placement along page side margins near middle of viewport
        const topPct   = 35 + Math.random() * 30; // 35%–65% of viewport
        const topPx    = topPct + 'vh';
        const marginPx = Math.min(32, Math.max(16, Math.floor(window.innerWidth * 0.035)));

        const fp = document.createElement('div');
        fp.className  = `baby-footprint ${isLeft ? 'footprint-left' : 'footprint-right'}`;
        fp.innerHTML  = FOOT_SVG;
        fp.style.setProperty('--fp-rotate', rotate);
        fp.style[side] = marginPx + 'px';
        fp.style.top   = topPx;

        document.body.appendChild(fp);
        activeCount++;
        stepIndex++;

        // Fade out after LINGER_MS
        const fadeTimer = setTimeout(() => {
            fp.classList.add('fading-out');
            setTimeout(() => {
                fp.remove();
                activeCount = Math.max(0, activeCount - 1);
            }, FADE_MS);
        }, LINGER_MS);

        // Safety cleanup
        setTimeout(() => {
            if (fp.parentNode) {
                fp.remove();
                activeCount = Math.max(0, activeCount - 1);
            }
            clearTimeout(fadeTimer);
        }, LINGER_MS + FADE_MS + 200);
    }

    function onScroll() {
        const currentY = window.scrollY;
        const delta    = Math.abs(currentY - lastScrollY);
        lastScrollY    = currentY;
        accumulated   += delta;

        while (accumulated >= STEP_PX) {
            accumulated -= STEP_PX;
            spawnFootprint(currentY);
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
})();


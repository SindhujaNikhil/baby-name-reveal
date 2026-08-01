/**
 * Baby Name Reveal - South Indian Nāmakaraṇa Logic
 */

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
    if (parentNamesEl) parentNamesEl.textContent = config.parentNames;
    if (heroTitleEl) heroTitleEl.textContent = config.babyTitle;
    if (heroBannerImg && config.heroImageMystery) heroBannerImg.src = config.heroImageMystery;

    // Format Target Date
    // If the date string doesn't have a timezone (e.g. Z or +05:30), it is parsed in the user's local timezone.
    const targetDate = new Date(config.revealDate);
    if (revealDateDisplay) {
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        revealDateDisplay.textContent = targetDate.toLocaleDateString('en-US', options);
    }

    // 3. Theme Toggle Setup
    const themes = ['temple', 'silk', 'jasmine'];
    const themeIcons = ['🏛️', '🦚', '🌸'];
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
            el.textContent = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-te');
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
        if (revealedNameEl) revealedNameEl.textContent = config.babyName;
        if (revealedGenderEl) {
            revealedGenderEl.setAttribute('data-en', `It's a ${config.babyGender}! 💕`);
            revealedGenderEl.setAttribute('data-te', `ఇది ఒక ${config.babyGender === 'Girl' ? 'అమ్మాయి' : 'అబ్బాయి'}! 💕`);
            revealedGenderEl.textContent = currentLang === 'en' ? `It's a ${config.babyGender}! 💕` : `ఇది ఒక ${config.babyGender === 'Girl' ? 'అమ్మాయి' : 'అబ్బాయి'}! 💕`;
        }
        if (nameMeaningEl) nameMeaningEl.textContent = config.nameMeaning;
        
        if (nakshatraValueEl) {
            nakshatraValueEl.textContent = `${config.nakshatra} • ${config.nakshatraTelugu}`;
        }
        if (etymologyValueEl) {
            etymologyValueEl.textContent = config.nameEtymology;
        }

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

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundBtn.textContent = soundEnabled ? '🎵' : '🔇';
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
});

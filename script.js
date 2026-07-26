/**
 * Baby Name Reveal - Application Logic
 * -----------------------------------
 * Handles countdown timer, reveal animation, sound synthesizer,
 * particle system, voting poll, guestbook, and secret code bypass.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Configuration
    const config = window.BabyRevealConfig || {
        revealDate: "2026-08-16T12:00:00",
        parentNames: "Parents",
        babyTitle: "Our Little Miracle",
        subtitle: "The countdown to reveal our baby's name!",
        babyName: "Aria Celeste",
        babyGender: "Girl",
        nameMeaning: "A beautiful melody filled with love.",
        defaultTheme: "neutral",
        secretCode: "reveal123"
    };

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
    const parentNamesEl = document.getElementById('parent-names');
    const heroTitleEl = document.getElementById('hero-title');
    const heroSubtitleEl = document.getElementById('hero-subtitle');
    const revealDateDisplay = document.getElementById('reveal-date-display');
    const themeBtn = document.getElementById('theme-btn');
    const soundBtn = document.getElementById('sound-btn');
    const secretTrigger = document.getElementById('secret-trigger');
    const secretModal = document.getElementById('secret-modal');
    const secretInput = document.getElementById('secret-input');
    const secretSubmitBtn = document.getElementById('secret-submit');
    const modalCloseBtn = document.getElementById('modal-close');
    const heroBannerImg = document.getElementById('hero-banner-img');

    // State Variables
    let soundEnabled = true;
    let isRevealed = false;
    let countdownInterval = null;

    // 2. Populate Header & Config Content
    if (parentNamesEl) parentNamesEl.textContent = config.parentNames;
    if (heroTitleEl) heroTitleEl.textContent = config.babyTitle;
    if (heroSubtitleEl) heroSubtitleEl.textContent = config.subtitle;
    if (config.heroImage && heroBannerImg) {
        heroBannerImg.src = config.heroImage;
    }

    // Format Target Date for display
    const targetDate = new Date(config.revealDate);
    if (revealDateDisplay) {
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        revealDateDisplay.textContent = targetDate.toLocaleDateString('en-US', options);
    }

    // 3. Theme Toggle Setup
    const themes = ['neutral', 'pink', 'blue'];
    let currentThemeIndex = themes.indexOf(config.defaultTheme) !== -1 ? themes.indexOf(config.defaultTheme) : 0;
    
    function applyTheme(themeName) {
        document.body.classList.remove('theme-pink', 'theme-blue');
        if (themeName !== 'neutral') {
            document.body.classList.add(`theme-${themeName}`);
        }
    }
    applyTheme(themes[currentThemeIndex]);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(themes[currentThemeIndex]);
        });
    }

    // 4. Countdown Timer Engine
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
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

    // 5. Reveal Engine & Celebration
    function triggerReveal() {
        if (isRevealed) return;
        isRevealed = true;

        if (countdownView) countdownView.style.display = 'none';
        if (revealView) revealView.style.display = 'block';

        if (revealedNameEl) revealedNameEl.textContent = config.babyName;
        if (revealedGenderEl) {
            revealedGenderEl.textContent = config.babyGender === "Surprise" ? "✨ Our Blessing ✨" : `It's a ${config.babyGender}! 💕`;
        }
        if (nameMeaningEl) nameMeaningEl.textContent = config.nameMeaning;

        // Play Triumph Music Chime
        if (soundEnabled) {
            playCelebrationSound();
        }

        // Fire Confetti Animation
        launchConfetti();
    }

    // 6. Web Audio API Celebration Chime
    function playCelebrationSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C E G C E G
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);
                gain.gain.setValueAtTime(0.3, ctx.currentTime + index * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.8);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(ctx.currentTime + index * 0.12);
                osc.stop(ctx.currentTime + index * 0.12 + 0.9);
            });
        } catch (e) {
            console.log('Audio playback prevented or unsupported', e);
        }
    }

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundBtn.textContent = soundEnabled ? '🎵' : '🔇';
        });
    }

    // 7. Confetti Particle Animation
    function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#f4a261', '#e76f51', '#2a9d8f', '#e9c46a', '#ffcad4', '#d81b60', '#0284c7'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 3,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
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
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });

            if (active) {
                animationFrame = requestAnimationFrame(animate);
            }
        }
        animate();
    }

    // 8. Ambient Background Canvas Particles (Floating Stars / Bubbles)
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        const pCtx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        });

        const bgParticles = Array.from({ length: 45 }, () => ({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.6 + 0.2,
            speedY: -(Math.random() * 0.4 + 0.1)
        }));

        function animateBgParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            bgParticles.forEach(p => {
                p.y += p.speedY;
                if (p.y < 0) p.y = particleCanvas.height;
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                pCtx.fill();
            });
            requestAnimationFrame(animateBgParticles);
        }
        animateBgParticles();
    }

    // 9. Interactive Guessing Poll Engine
    const votesKey = 'baby_reveal_votes';
    let votes = JSON.parse(localStorage.getItem(votesKey)) || { boy: 12, girl: 18 };
    const userVotedKey = 'baby_reveal_voted';

    const btnBoy = document.getElementById('vote-boy');
    const btnGirl = document.getElementById('vote-girl');
    const countBoy = document.getElementById('count-boy');
    const countGirl = document.getElementById('count-girl');
    const barBoy = document.getElementById('bar-boy');
    const barGirl = document.getElementById('bar-girl');

    function updatePollUI() {
        const total = (votes.boy || 0) + (votes.girl || 0);
        const boyPercent = total ? Math.round((votes.boy / total) * 100) : 50;
        const girlPercent = total ? 100 - boyPercent : 50;

        if (countBoy) countBoy.textContent = `${votes.boy} votes (${boyPercent}%)`;
        if (countGirl) countGirl.textContent = `${votes.girl} votes (${girlPercent}%)`;
        if (barBoy) barBoy.style.width = `${boyPercent}%`;
        if (barGirl) barGirl.style.width = `${girlPercent}%`;

        if (localStorage.getItem(userVotedKey)) {
            if (btnBoy) btnBoy.classList.add('voted');
            if (btnGirl) btnGirl.classList.add('voted');
        }
    }
    updatePollUI();

    function castVote(type) {
        if (localStorage.getItem(userVotedKey)) return;
        votes[type] = (votes[type] || 0) + 1;
        localStorage.setItem(votesKey, JSON.stringify(votes));
        localStorage.setItem(userVotedKey, type);
        updatePollUI();
        if (soundEnabled) playCelebrationSound();
    }

    if (btnBoy) btnBoy.addEventListener('click', () => castVote('boy'));
    if (btnGirl) btnGirl.addEventListener('click', () => castVote('girl'));

    // 10. Guestbook Engine
    const wishesKey = 'baby_reveal_wishes';
    let wishes = JSON.parse(localStorage.getItem(wishesKey)) || [
        { name: "Grandma Rose", text: "We can't wait to meet our sweet grandchild! Sending all our love.", date: "July 25, 2026" },
        { name: "Uncle Mark", text: "Counting down the days! Wishing mom and baby good health!", date: "July 26, 2026" }
    ];

    const wishForm = document.getElementById('wish-form');
    const wishesGrid = document.getElementById('wishes-grid');

    function renderWishes() {
        if (!wishesGrid) return;
        wishesGrid.innerHTML = '';
        wishes.forEach(item => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `
                <div class="wish-author">${escapeHTML(item.name)}</div>
                <div class="wish-text">${escapeHTML(item.text)}</div>
                <div class="wish-date">${item.date}</div>
            `;
            wishesGrid.prepend(card);
        });
    }
    renderWishes();

    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('wish-name');
            const textInput = document.getElementById('wish-message');

            if (!nameInput.value.trim() || !textInput.value.trim()) return;

            const newWish = {
                name: nameInput.value.trim(),
                text: textInput.value.trim(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };

            wishes.push(newWish);
            localStorage.setItem(wishesKey, JSON.stringify(wishes));
            renderWishes();

            nameInput.value = '';
            textInput.value = '';
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // 11. Secret Code & Keyboard Bypass (Shift + P)
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
        // Press Shift + P to instantly preview the reveal
        if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
            triggerReveal();
        }
    });
});

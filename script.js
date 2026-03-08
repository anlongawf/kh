document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('open-btn');
    const envelopeSection = document.getElementById('envelope-section');
    const mainContent = document.getElementById('main-content');
    const letterSection = document.getElementById('letter-section');
    const photoSection = document.getElementById('photo-section');

    const showLetterBtn = document.getElementById('show-letter-btn');
    const showPhotoBtn = document.getElementById('show-photo-btn');
    const restartBtn = document.getElementById('restart-btn');

    const typingText = document.getElementById('typing-text');
    const storySlides = document.querySelectorAll('.story-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-story');
    const nextBtn = document.getElementById('next-story');
    let currentSlide = 0;

    const particlesContainer = document.getElementById('particles-container');

    // --- Letter Content (Editable by user) ---
    const letterContent = `Gửi Alex. Sắp tốt nghiệp gòi chăm chỉ học hành lênnnn nhéee. Pan hi vọng Alex ráng ráng trở thành cô giáo để chùi đít cho trẻ con nhé :)) \n Không chỉ 8/3 mà tất cả mọi người Alex đều xinh đẹp heee. Sắp trễ gòi lát Alex ngủ ngon mơ đẹp kaaka.`;

    // --- State Management ---
    const switchSection = (current, next) => {
        current.classList.add('hidden');
        current.classList.remove('active');
        setTimeout(() => {
            next.classList.remove('hidden');
            next.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    };

    // --- Open Envelope ---
    openBtn.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            switchSection(envelopeSection, mainContent);
            createFloatingHearts();
        }, 1500);
    });

    // --- Story Carousel Logic ---
    const updateCarousel = (index) => {
        storySlides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (i < index) {
                slide.classList.add('prev');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Show "Continue" button only on the last slide
        if (index === storySlides.length - 1) {
            showLetterBtn.classList.remove('hidden');
        } else {
            showLetterBtn.classList.add('hidden');
        }
    };

    nextBtn.addEventListener('click', () => {
        if (currentSlide < storySlides.length - 1) {
            currentSlide++;
            updateCarousel(currentSlide);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel(currentSlide);
        }
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-slide'));
            updateCarousel(currentSlide);
        });
    });

    // --- Typing Effect ---
    let i = 0;
    const typeWriter = () => {
        if (i < letterContent.length) {
            if (letterContent.charAt(i) === '\n') {
                typingText.innerHTML += '<br>';
            } else {
                typingText.innerHTML += letterContent.charAt(i);
            }
            i++;
            setTimeout(typeWriter, 50);
        } else {
            showPhotoBtn.classList.remove('hidden');
        }
    };

    showLetterBtn.addEventListener('click', () => {
        switchSection(mainContent, letterSection);
        setTimeout(typeWriter, 1000);
    });

    showPhotoBtn.addEventListener('click', () => {
        switchSection(letterSection, photoSection);
    });

    restartBtn.addEventListener('click', () => {
        location.reload();
    });

    // --- Background Particles ---
    const createFloatingHearts = () => {
        const symbols = ['❤️', '✨', '🌸', '💖', '🎁'];
        setInterval(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.opacity = Math.random();
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        }, 300);
    };

    // Initial particles (subtle)
    createFloatingHearts();
});

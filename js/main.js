document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('typed-text');
    textElement.innerText = 'Leo Reis';
    textElement.classList.add('typing-animation');

    const sections = document.querySelectorAll('.section');
    const navbar = document.querySelector('.navbar-principal');
    let dominantSection = null;

    const updateNavbar = () => {
        let maxVisibleRatio = 0;
        let currentDominant = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            const visibleRatio = visibleHeight / rect.height;

            if (visibleRatio > maxVisibleRatio) {
                maxVisibleRatio = visibleRatio;
                currentDominant = section;
            }
        });

        if (currentDominant && currentDominant !== dominantSection) {
            dominantSection = currentDominant;

            navbar.classList.remove('navbar-clara', 'navbar-escura');

            if (dominantSection.classList.contains('claro')) {
                navbar.classList.add('navbar-clara');
            } else if (dominantSection.classList.contains('escuro')) {
                navbar.classList.add('navbar-escura');
            }
        }
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    };

    const observer = new IntersectionObserver(updateNavbar, observerOptions);
    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', updateNavbar);
    window.addEventListener('resize', updateNavbar);

    updateNavbar();

    const leoImg = document.querySelector('.imagem-inferior-direito');
    if (leoImg) {
        const sources = {
            left: 'img/mini-leo.png',
            right: 'img/mini-leo2.png',
            blink: 'img/mini-leo3.png'
        };

        Object.values(sources).forEach(src => {
            new Image().src = src;
        });

        const sequence = [
            { src: sources.left, duration: 2500 },
            { src: sources.blink, duration: 150 },
            { src: sources.left, duration: 150 },
            { src: sources.blink, duration: 150 },
            { src: sources.left, duration: 150 },
            { src: sources.right, duration: 2500 },
            { src: sources.blink, duration: 150 },
            { src: sources.right, duration: 150 },
            { src: sources.blink, duration: 150 },
            { src: sources.right, duration: 150 }
        ];

        let step = 0;
        const playNextFrame = () => {
            const frame = sequence[step];
            leoImg.src = frame.src;
            step = (step + 1) % sequence.length;
            setTimeout(playNextFrame, frame.duration);
        };

        playNextFrame();
    }
});

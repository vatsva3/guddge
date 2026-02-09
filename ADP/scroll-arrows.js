// Scroll Arrows Navigation
(function() {
    'use strict';

    // Create styles
    const styles = `
        .scroll-arrows {
            position: fixed;
            right: 20px;
            bottom: 150px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 9999;
        }

        .scroll-arrow {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            transform: translateX(50px);
        }

        .scroll-arrow.visible {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
        }

        .scroll-arrow:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .scroll-arrow:active {
            transform: scale(0.95);
        }

        .scroll-arrow svg {
            width: 24px;
            height: 24px;
            fill: white;
        }

        .scroll-arrow.to-top svg {
            transform: rotate(180deg);
        }

        .scroll-arrow.to-bottom svg {
            transform: rotate(0deg);
        }

        @media (max-width: 768px) {
            .scroll-arrows {
                right: 10px;
                bottom: 120px;
            }
            
            .scroll-arrow {
                width: 44px;
                height: 44px;
            }
            
            .scroll-arrow svg {
                width: 20px;
                height: 20px;
            }
        }
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create scroll arrows container
    const arrowsContainer = document.createElement('div');
    arrowsContainer.className = 'scroll-arrows';
    arrowsContainer.innerHTML = `
        <button class="scroll-arrow to-bottom" title="Scroll Down" aria-label="Scroll Down">
            <svg viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
        </button>
        <button class="scroll-arrow to-top" title="Scroll to Top" aria-label="Scroll to Top">
            <svg viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
        </button>
    `;
    document.body.appendChild(arrowsContainer);

    // Get buttons
    const toTopBtn = arrowsContainer.querySelector('.to-top');
    const toBottomBtn = arrowsContainer.querySelector('.to-bottom');

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Scroll to bottom function
    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Add event listeners
    toTopBtn.addEventListener('click', scrollToTop);
    toBottomBtn.addEventListener('click', scrollToBottom);

    // Show/hide arrows based on scroll position
    function updateArrowVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollableHeight = scrollHeight - clientHeight;

        // Show top arrow when scrolled down
        if (scrollTop > 300) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }

        // Show bottom arrow when near top (can scroll down)
        if (scrollTop < scrollableHeight - 300) {
            toBottomBtn.classList.add('visible');
        } else {
            toBottomBtn.classList.remove('visible');
        }
    }

    // Throttle function for scroll event
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Listen for scroll events
    window.addEventListener('scroll', throttle(updateArrowVisibility, 100));

    // Initial check
    updateArrowVisibility();

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            scrollToTop();
        }
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            scrollToBottom();
        }
    });

    console.log('Scroll Arrows loaded successfully');
})();

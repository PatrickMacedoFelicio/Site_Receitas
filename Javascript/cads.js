let currentIndex = 0;

// Clone dos cards para criar o efeito infinito
const carousel = document.querySelector('.caros');
const cards = Array.from(document.querySelectorAll('.cartas'));
const totalCards = cards.length;
const visibleCards = 4;

function cloneCards() {
    // Clona os primeiros e últimos cards
    const clonesStart = cards.slice(0, visibleCards).map(card => card.cloneNode(true));
    const clonesEnd = cards.slice(-visibleCards).map(card => card.cloneNode(true));

    // Adiciona os clones no carrossel
    clonesStart.forEach(clone => carousel.appendChild(clone));
    clonesEnd.forEach(clone => carousel.insertBefore(clone, carousel.firstChild));
}

// Inicializa o carrossel
function initCarousel() {
    cloneCards();
    atualizarCarousel();
}

function moveSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalCards - 1;
    } else if (currentIndex >= totalCards) {
        currentIndex = 0;
    }

    atualizarCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    atualizarCarousel();
}

function atualizarCarousel() {
    const dots = document.querySelectorAll('.dot');
    const offset = -(currentIndex + visibleCards) * (100 / visibleCards);

    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(${offset}%)`;

    // Atualiza o estado dos pontinhos
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Ajusta a transição ao final do efeito
carousel.addEventListener('transitionend', () => {
    if (currentIndex === 0 || currentIndex === totalCards - 1) {
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${-(currentIndex + visibleCards) * (100 / visibleCards)}%)`;
    }
});

initCarousel();
const carouselImages = document.querySelector('.carousel-images');
const totalImages = document.querySelectorAll('.carousel-images img').length;
const indicators = document.querySelectorAll('.indicator');

let index = 0;

function moveToNextImage() {
    index = (index + 1) % totalImages;
    updateCarousel();
}

function moveToPreviousImage() {
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
}

function updateCarousel() {
    const offset = -index * 100;
    carouselImages.style.transform = `translateX(${offset}vw)`;

    // Atualiza os indicadores
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[index].classList.add('active');
}

// Inicializa os indicadores
updateCarousel();

// Troca de imagem a cada 3 segundos (3000 milissegundos)
let interval = setInterval(moveToNextImage, 4500);

document.querySelector('.carousel').addEventListener('mouseover', () => {
    clearInterval(interval);
});

document.querySelector('.carousel').addEventListener('mouseout', () => {
    interval = setInterval(moveToNextImage, 4500);
});

// Adiciona a funcionalidade de navegação pelos indicadores
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        index = parseInt(indicator.getAttribute('data-index'));
        updateCarousel();
    });
});
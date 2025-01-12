const cardsContainer = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// İlk ve son kartları klonlayıp id atayalım
const firstCardClone = cards[0].cloneNode(true);
firstCardClone.id = 'first-clone';
const lastCardClone = cards[cards.length - 1].cloneNode(true);
lastCardClone.id = 'last-clone';

cardsContainer.appendChild(firstCardClone);
cardsContainer.insertBefore(lastCardClone, cardsContainer.firstChild);

const allCards = document.querySelectorAll('.card');
let currentIndex = 1;
let isTransitioning = false;

const updateSliderPosition = () => {
    const cardWidth = allCards[currentIndex].offsetWidth + 20; // Kart genişliği + margin
    cardsContainer.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
};

// Başlangıç pozisyonunu ayarla
updateSliderPosition();

// Geçişin tamamlanmasını dinle
cardsContainer.addEventListener('transitionend', () => {
    const currentCard = allCards[currentIndex];
    if (currentCard.id === 'first-clone') {
        cardsContainer.style.transition = 'none';
        currentIndex = 1;
        updateSliderPosition();
        setTimeout(() => {
            cardsContainer.style.transition = 'transform 0.5s ease-in-out';
        });
    }
    if (currentCard.id === 'last-clone') {
        cardsContainer.style.transition = 'none';
        currentIndex = allCards.length - 2;
        updateSliderPosition();
        setTimeout(() => {
            cardsContainer.style.transition = 'transform 0.5s ease-in-out';
        });
    }
    isTransitioning = false;
});

// Sağ oka tıklayınca
nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    const cardWidth = allCards[currentIndex].offsetWidth + 20;
    if (currentIndex >= allCards.length - 1) return;
    isTransitioning = true;
    currentIndex++;
    cardsContainer.style.transition = 'transform 0.5s ease-in-out';
    cardsContainer.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
});

// Sol oka tıklayınca
prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    const cardWidth = allCards[currentIndex].offsetWidth + 20;
    if (currentIndex <= 0) return;
    isTransitioning = true;
    currentIndex--;
    cardsContainer.style.transition = 'transform 0.5s ease-in-out';
    cardsContainer.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
});

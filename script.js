// Integration Section: Handle tool name display on hover
const integrationIconCards = document.querySelectorAll('.integration-icon-card');
const currentIntegrationTool = document.querySelector('.current-integration-tool');
const integrationToolDescription = document.querySelector('.integration-tool-description');

const toolDescriptions = {
    'Google Calendar': 'Seamless schedule synchronization',
    'Google Meet': 'Seamless video meetings',
    'Microsoft Outlook': 'Email & schedule management',
    'Microsoft Teams': 'Team collaboration & chat',
    'Gmail': 'Seamless email management'
};

integrationIconCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        const toolName = card.getAttribute('data-tool');
        currentIntegrationTool.textContent = toolName;
        integrationToolDescription.textContent = toolDescriptions[toolName] || '';
        integrationIconCards.forEach(item => item.classList.remove('active'));
        card.classList.add('active');
    });
    card.addEventListener('mouseout', () => {
        // You can revert to a default or keep the last active. For now, keep last active.
    });
});

// Initialize with the first card active
if (integrationIconCards.length > 0) {
    integrationIconCards[0].classList.add('active');
    const toolName = integrationIconCards[0].getAttribute('data-tool');
    currentIntegrationTool.textContent = toolName;
    integrationToolDescription.textContent = toolDescriptions[toolName] || '';
}


// Testimonial Carousel
const carouselTrack = document.querySelector('.testimonial-carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev-btn');
const nextBtn = document.querySelector('.carousel-btn.next-btn');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

function updateCarousel() {
    const cardWidth = testimonialCards[0].offsetWidth + 30; // Card width + gap
    carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < testimonialCards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to start
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = testimonialCards.length - 1; // Loop to end
    }
    updateCarousel();
});

// Adjust carousel on window resize
window.addEventListener('resize', updateCarousel);

// Initial setup
updateCarousel();

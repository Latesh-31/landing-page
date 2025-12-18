// Intersection Observer for scroll animations
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Adjust as needed: 0.1 means 10% of the element must be visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Unobserve once animated
        }
    });
}, observerOptions);

animateOnScrollElements.forEach(el => {
    observer.observe(el);
});

// Number animation for stats section
const statNumbers = document.querySelectorAll('.stats-section .number');

const animateNumber = (element) => {
    const target = parseInt(element.getAttribute('data-target').replace(/,/g, ''), 10);
    let current = 0;
    const duration = 1500; // milliseconds
    const start = performance.now();
    const isPlus = element.getAttribute('data-target').includes('+');

    const update = (timestamp) => {
        const progress = (timestamp - start) / duration;
        if (progress < 1) {
            current = target * Math.sin(progress * Math.PI / 2); // Ease-out like curve
            element.textContent = Math.round(current).toLocaleString() + (isPlus ? '+' : '');
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + (isPlus ? '+' : '');
        }
    };
    requestAnimationFrame(update);
};

const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumber(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

statNumbers.forEach(num => {
    statObserver.observe(num);
});


// Unmarshal AI section list interaction
const aiListItems = document.querySelectorAll('.unmarshal-ai-section ul li');
const aiIllustration = document.querySelector('.unmarshal-ai-section .ai-graphic');
const aiIllustrationContent = {
    "Your Gateway to Advanced Blockchain Data Indexing": {
        laptopVisible: true,
        centralBlockText: "BINANCE CHAIN<br>1,023,456 BLOCKS",
        showTower: true,
        streamAnimation: true,
        chartAnimation: true
    },
    "Decentralized Unmarshal Indexers": {
        laptopVisible: true,
        centralBlockText: "INDEXER NODE<br>ACTIVE",
        showTower: true,
        streamAnimation: false,
        chartAnimation: true
    },
    "Unmarshal AI Toolkit": {
        laptopVisible: true,
        centralBlockText: "AI TOOLKIT<br>READY",
        showTower: false,
        streamAnimation: false,
        chartAnimation: true
    },
    "Support for RWA Chains and DePIN Protocols": {
        laptopVisible: false,
        centralBlockText: "RWA & DePIN<br>SUPPORTED",
        showTower: true,
        streamAnimation: true,
        chartAnimation: false
    },
    "Introducing Blockchain Data Intent Chain": {
        laptopVisible: true,
        centralBlockText: "INTENT CHAIN<br>ENABLED",
        showTower: true,
        streamAnimation: true,
        chartAnimation: true
    }
};

function updateAiIllustration(contentKey) {
    const config = aiIllustrationContent[contentKey];
    const laptopFrame = aiIllustration.querySelector('.laptop-frame');
    const centralBlock = aiIllustration.querySelector('.central-block');
    const blockStream = aiIllustration.querySelector('.block-stream');
    const dataTower = aiIllustration.querySelector('.data-tower');
    const chartLines = aiIllustration.querySelectorAll('.screen .chart-line');
    const chartDots = aiIllustration.querySelectorAll('.screen .chart-dot');

    if (config.laptopVisible) {
        laptopFrame.style.opacity = '1';
        laptopFrame.style.transform = 'scale(1)';
    } else {
        laptopFrame.style.opacity = '0';
        laptopFrame.style.transform = 'scale(0.8)';
    }

    centralBlock.innerHTML = `<span>${config.centralBlockText.split('<br>')[0]}</span><strong>${config.centralBlockText.split('<br>')[1]}</strong>`;

    if (config.showTower) {
        dataTower.style.opacity = '1';
        dataTower.style.transform = 'translateY(0) translateX(-50%)';
    } else {
        dataTower.style.opacity = '0';
        dataTower.style.transform = 'translateY(20px) translateX(-50%)';
    }

    if (config.streamAnimation) {
        blockStream.style.opacity = '1';
        blockStream.style.animationPlayState = 'running';
    } else {
        blockStream.style.opacity = '0';
        blockStream.style.animationPlayState = 'paused';
    }

    if (config.chartAnimation) {
        chartLines.forEach(el => el.style.opacity = '1');
        chartDots.forEach(el => el.style.opacity = '1');
    } else {
        chartLines.forEach(el => el.style.opacity = '0');
        chartDots.forEach(el => el.style.opacity = '0');
    }
}

aiListItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        aiListItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');
        const contentKey = item.getAttribute('data-content');
        updateAiIllustration(contentKey);
    });
});

// Initialize with the first item's content
if (aiListItems.length > 0) {
    aiListItems[0].classList.add('active');
    updateAiIllustration(aiListItems[0].getAttribute('data-content'));
}

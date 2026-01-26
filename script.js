window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const pageContent = document.querySelector('.page-content');

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            pageContent.style.opacity = '1';
            initApp();
        }, 500);
    }, 1200);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const icon = document.getElementById("icon");
const navItems = document.querySelectorAll(".nav-link");

// 2. The toggle function (Keep your existing logic)
function toggleMenu(forceClose = false) {
  const isOpen = forceClose ? false : !navLinks.classList.contains("active");
  
  navLinks.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

// 3. ADD THE LISTENERS (This is what was missing)
// Listen for clicks on the hamburger button
hamburger.addEventListener("click", () => toggleMenu());

// Close the menu automatically when a link is clicked (useful for mobile)
navItems.forEach(link => {
  link.addEventListener("click", () => toggleMenu(true));
});

// Close the menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    toggleMenu(true);
  }
});

function initApp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });  

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`; // Staggered entrance
        observer.observe(card);
    });

}

// Typewriter Effect
const textElement = document.getElementById("typewriter");
const phrases = [
    "a Creative Developer.",
    "a UI/UX Enthusiast.",
    "a Problem Solver.",
    "obsessed with clean code."
];

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove characters
        textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
        typeSpeed = 75; // Faster when deleting
    } else {
        // Add characters
        textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
        typeSpeed = 150;
    }

    // Logic for switching between typing and deleting
    if (!isDeleting && characterIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end of phrase
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the effect
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 2000); // Small delay to sync with page load
});
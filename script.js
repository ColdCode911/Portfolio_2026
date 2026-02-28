// 1. Initial Welcome Alert
alert('Hello! Welcome to my portfolio website. Feel free to explore and reach out!');

// 2. Page Loader Logic
window.addEventListener('load', () => 
{
    const loader = document.querySelector('.loader');
    const pageContent = document.querySelector('.page-content');

    setTimeout(() => 
    {
        loader.style.opacity = '0';
        
        setTimeout(() => 
        {
            loader.style.display = 'none';
            pageContent.style.opacity = '1';
            initApp();
        }, 500);

    }, 1200);
});

// 3. Navigation Selection
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const icon = document.getElementById("icon");
const navItems = document.querySelectorAll(".nav-link");
const pageContent = document.querySelector(".page-content"); // For Blur Effect

// 4. Mobile Menu Toggle with Blur Effect
function toggleMenu(forceClose = false) 
{
    const isOpen = forceClose ? false : !navLinks.classList.contains("active");
    
    // Toggle Menu Class
    navLinks.classList.toggle("active", isOpen);
    
    // Toggle Content Blur Class
    if (pageContent) 
    {
        pageContent.classList.toggle("blur-content", isOpen);
    }
    
    // Accessibility & Icon Switch
    hamburger.setAttribute("aria-expanded", isOpen);
    
    if (icon) 
    {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
}

// 5. Navigation Listeners
hamburger.addEventListener("click", () => toggleMenu());

navItems.forEach(link => 
{
    link.addEventListener("click", () => toggleMenu(true));
});

// Close when clicking on blurred background
document.addEventListener("click", (event) => 
{
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) 
    {
        toggleMenu(true);
    }
});

// 6. Intersection Observer (Scroll Animations)
function initApp() 
{
    const observer = new IntersectionObserver((entries) => 
    {
        entries.forEach(entry => 
        {
            if (entry.isIntersecting) 
            {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => 
    {
        observer.observe(section);
    });  

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => 
    {
        card.style.transitionDelay = `${index * 0.1}s`; 
        observer.observe(card);
    });
}

// 7. Typewriter Effect
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

function typeEffect() 
{
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) 
    {
        textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
        typeSpeed = 75; 
    } 
    else 
    {
        textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && characterIndex === currentPhrase.length) 
    {
        isDeleting = true;
        typeSpeed = 2000; 
    } 
    else if (isDeleting && characterIndex === 0) 
    {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// 8. Start Everything
document.addEventListener("DOMContentLoaded", () => 
{
    setTimeout(typeEffect, 2000);
});
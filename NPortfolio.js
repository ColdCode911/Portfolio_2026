window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    const pageContent = document.querySelector('.page-content');

    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = 'none';
        pageContent.style.opacity = "1";  // Fade in the page content

        // START observers ONLY after content is visible
        startSectionObservers();

      }, 600);

    }, 1500);                               // Adjust the timeout duration to 2.5s
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");                // Select all nav links
const icon = document.getElementById("icon");

function toggleMenu(forceClose = false) {
  const isOpen = forceClose ? false : !navLinks.classList.contains("active");
  
  navLinks.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-xmark", isOpen);
}

hamburger.addEventListener("click", () => toggleMenu());

navItems.forEach(link => {
  link.addEventListener("click", () => toggleMenu(true) ); // Force close the menu on link click
});

function startSectionObservers() {

  /* =====================
   SECTION REVEAL (ANIMATION)
===================== */
const revealSections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target); // reveal once
    });
  },
  {
    threshold: 0.1,           // forgiving
    rootMargin: "0px 0px -10% 0px",
  }
);

revealSections.forEach(section => {
  revealObserver.observe(section);
});


/* =====================
   NAV ACTIVE LINK TRACKING
===================== */
const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      navLinksAll.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentId}`
        );
      });
    });
  },
  {
    rootMargin: "-60px 0px -50% 0px", // accounts for fixed header
    threshold: 0,
  }
);

sections.forEach(section => {
  navObserver.observe(section);
});
}




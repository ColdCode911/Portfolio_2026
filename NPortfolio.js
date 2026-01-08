window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    const pageContent = document.querySelector('.page-content');

    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = 'none';
        pageContent.style.opacity = "1";  // Fade in the page content
      }, 600);

    }, 1500);                               // Adjust the timeout duration to 2.5s
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");                // Select all nav links
const icon = document.getElementById("icon");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-xmark", isOpen);

    hamburger.setAttribute("aria-expanded", isOpen);
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
    hamburger.setAttribute("aria-expanded", navLinks.classList.contains("active"));
  });
});

const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");

      navLinksAll.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }
  });

const sectors = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
    {
      threshold: 0.2,
    }
);

    sectors.forEach((sector) => {
      observer.observe(sector);
    });
  }
);



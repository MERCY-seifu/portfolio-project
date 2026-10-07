const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const menuFilters = document.querySelectorAll("[data-menu-filter]");
const menuSections = document.querySelectorAll("[data-menu-category]");

if (menuFilters.length && menuSections.length) {
  menuFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selectedCategory = filter.dataset.menuFilter;

      menuFilters.forEach((button) => {
        const isSelected = button === filter;
        button.classList.toggle("is-active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });

      menuSections.forEach((section) => {
        section.hidden = selectedCategory !== "all" && section.dataset.menuCategory !== selectedCategory;
      });
    });
  });

  document.body.classList.add("menu-ready");
}

const revealElements = document.querySelectorAll(
  ".section-heading, .feature-card, .menu-item, .quote-card, .gallery-card, .menu-section, .about-card, .contact-card, .ceremony-inner"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => {
    element.setAttribute("data-reveal", "");
    revealObserver.observe(element);
  });
  document.body.classList.add("reveal-ready");
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = contactForm.querySelector(".form-message");
    if (message) {
      message.textContent = "Thanks! We’ll get back to you soon.";
    }
    contactForm.reset();
  });
}

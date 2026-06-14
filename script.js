document.body.classList.add("js-ready");

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach((section) => revealObserver.observe(section));
} else {
  sections.forEach((section) => section.classList.add("is-visible"));
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && navTargets.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0.01,
    }
  );

  navTargets.forEach((target) => navObserver.observe(target));
}

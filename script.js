document.body.classList.add("js-ready");

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const header = document.querySelector(".site-header");
const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

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
    { threshold: 0.06 }
  );

  sections.forEach((section) => revealObserver.observe(section));
} else {
  sections.forEach((section) => section.classList.add("is-visible"));
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const clearNavNearTop = () => {
  if (window.scrollY >= Math.min(240, window.innerHeight * 0.25)) return false;
  navLinks.forEach((link) => link.classList.remove("is-active"));
  return true;
};

clearNavNearTop();
window.addEventListener("scroll", clearNavNearTop, { passive: true });

if ("IntersectionObserver" in window && navTargets.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      if (clearNavNearTop()) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    {
      rootMargin: "-24% 0px -62% 0px",
      threshold: 0.01,
    }
  );

  navTargets.forEach((target) => navObserver.observe(target));
}

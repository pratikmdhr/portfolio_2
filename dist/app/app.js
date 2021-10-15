const body = document.querySelector('body');
const hamburger = document.querySelector('#btn-hamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElements = document.querySelectorAll('.has-fade');
const mobileLinks = document.querySelectorAll('.mobile__menu');
const navLinks = document.querySelectorAll('.nav-links');
const navBar = document.querySelector('.nav');

// Links and buttons
const nextSectionBtn = document.querySelector('#next-section');
const homeBtn = document.querySelectorAll('#home-link');
const aboutBtn = document.querySelectorAll('#about-link');
const skillsBtn = document.querySelectorAll('#skills-link');
const projectsBtn = document.querySelectorAll('#projects-link');
const contactBtn = document.querySelectorAll('#contact-link');

// Target sections
const homeSection = document.querySelector('#home');
const aboutSection = document.querySelector('#about');
const skillsSection = document.querySelector('#skills');
const projectsSection = document.querySelector('#projects');
const contactSection = document.querySelector('#contact');

// To reveal section on scrolling
const allSections = document.querySelectorAll('.section');

// for mobile menu
const toggler = function () {
  fadeElements.forEach((el) => {
    el.classList.toggle('has-fade');
  });
};

hamburger.addEventListener('click', toggler);
overlay.addEventListener('click', toggler);
mobileLinks.forEach((link) => {
  link.addEventListener('click', toggler);
});

// smooth scrolling

const scrollTo = function (target) {
  const targetCoords = target.getBoundingClientRect();
  window.scrollTo({
    left: targetCoords.left + window.pageXOffset,
    top: targetCoords.top + window.pageYOffset,
    behavior: 'smooth',
  });
};

nextSectionBtn.addEventListener('click', () => {
  scrollTo(aboutSection);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    if (!e.target.dataset.id) return;
    scrollTo(document.querySelector(`#${e.target.dataset.id}`));
  });
});

// sticky nav bar
const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting
    ? navBar.classList.remove('sticky')
    : navBar.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.45,
});

headerObserver.observe(header);

// Revealing Section elements on Scroll

const revealSection = function (entries, observer) {
  [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.add('animate');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
});

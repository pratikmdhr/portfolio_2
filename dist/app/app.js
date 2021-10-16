const body = document.querySelector('body');
const hamburger = document.querySelector('#btn-hamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElements = document.querySelectorAll('.has-fade');
const mobileLinks = document.querySelectorAll('.mobile__menu');
const navLinks = document.querySelectorAll('.nav-links');
const navBar = document.querySelector('.nav');

const nextSectionBtn = document.querySelector('#next-section');
const homeBtn = document.querySelectorAll('#home-link');
const aboutBtn = document.querySelectorAll('#about-link');
const skillsBtn = document.querySelectorAll('#skills-link');
const projectsBtn = document.querySelectorAll('#projects-link');
const contactBtn = document.querySelectorAll('#contact-link');

const aboutSection = document.querySelector('#about');

const SectionsToFadeIn = document.querySelectorAll('.section-fade');
const allSections = document.querySelectorAll('.section');
const navLinksDesktop = document.querySelectorAll('.desktop__menu');

let observe = true;

// mobile menu
const toggler = function () {
  navBar.classList.toggle('no-bg');
  body.classList.toggle('no-scroll');
  hamburger.classList.toggle('open');

  if (hamburger.classList.contains('open')) {
    fadeElements.forEach(function (el) {
      el.classList.remove('fade-out');
      el.classList.add('fade-in');
      el.classList.remove('has-fade');
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.remove('fade-in');
      el.classList.add('fade-out');
      el.classList.add('has-fade');
    });
  }
};

hamburger.addEventListener('click', (e) => {
  e.preventDefault();
  toggler();
});
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

    navLinksDesktop.forEach((link2) => {
      link2.classList.remove('active');
    });
    e.target.classList.add('active');

    // To deactivate Intersection observer until scroll completion
    observe = false;
    setTimeout(() => {
      observe = true;
    }, 500);
  });
});

// Sticky nav bar
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

const sectionToReveal = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

SectionsToFadeIn.forEach((section) => {
  sectionToReveal.observe(section);
});

// Activate section items on scroll

activateSection = function (entries, observer) {
  [entry] = entries;
  if (!entry.isIntersecting) return;

  if (observe) {
    navLinksDesktop.forEach((link) => {
      link.classList.remove('active');
      if (link.dataset.id === entry.target.id) {
        link.classList.add('active');
      }
    });
  }
};

const sectionToActivate = new IntersectionObserver(activateSection, {
  root: null,
  threshold: 1,
});

allSections.forEach((section) => {
  sectionToActivate.observe(section);
});

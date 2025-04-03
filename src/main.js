import Accordion from 'accordion-js';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';

const burgerMenuButton = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const navMenuButton = document.querySelector('.nav-menu-button');
const navMenu = document.querySelector('.nav-list');
const navBlock = document.querySelector('.navigation');
const aboutInfoBlock = document.querySelector('.about-info');
const aboutSwiperBlock = document.querySelector('.about-swiper');
const projectsSwiperBlock = document.querySelector('.projects-swiper');
const faqBlock = document.querySelector('.faq-questions-list');
const reviewsBlock = document.querySelector('.reviews-swiper');

const aboutAccordionOptions = {
  elementClass: 'about-item',
  triggerClass: 'about-info-expand-button',
  panelClass: 'about-panel-wrap',
};

new Accordion(aboutInfoBlock, { ...aboutAccordionOptions });

const faqAccordionOptions = {
  elementClass: 'faq-question-card',
  triggerClass: 'faq-expand-button',
  panelClass: 'faq-answer',
};

new Accordion(faqBlock, { ...faqAccordionOptions });

const aboutSwiperOptions = {
  modules: [Navigation, Keyboard],
  loop: true,
  navigation: {
    nextEl: '.about-swiper-button-next',
  },
  slidesPerView: 2,
  wrapperClass: 'tech-stack',
  slideClass: 'tech-name',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
};

new Swiper(aboutSwiperBlock, { ...aboutSwiperOptions });

const projectSwiperOptions = {
  modules: [Navigation, Keyboard],
  navigation: {
    nextEl: '.project-swiper-controlls-next',
    prevEl: '.project-swiper-controlls-prev',
  },
  wrapperClass: 'projects-list',
  slideClass: 'project-card',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
};

new Swiper(projectsSwiperBlock, { ...projectSwiperOptions });

const reviewsSwiperOptions = {
  modules: [Navigation, Keyboard],
  navigation: {
    nextEl: '.review-controlls-next',
    prevEl: '.review-controlls-prev',
  },
  wrapperClass: 'reviews-list',
  slideClass: 'review-card',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
};

new Swiper(reviewsBlock, { ...reviewsSwiperOptions });

mobileMenu.addEventListener('click', e => {
  if (e.target.nodeName === 'A' || e.target.nodeName === 'BUTTON') {
    mobileMenu.style.display = 'none';
    unlockScroll();
  }
});

burgerMenuButton.addEventListener('click', e => {
  mobileMenu.style.display = 'block';
  lockScroll();
});

navBlock.addEventListener('click', e => {
  console.log(navMenu.classList.contains('visually-hidden'));
  if (e.target === navMenuButton) {
    if (navMenu.classList.contains('visually-hidden'))
      navMenu.classList.remove('visually-hidden');
    else navMenu.classList.add('visually-hidden');
  } else if (!navMenu.classList.contains('visually-hidden'))
    navMenu.classList.add('visually-hidden');
});

//#region scroll lock stuff
// Function to lock scrolling
function lockScroll() {
  // Store the current scroll position
  const scrollY = window.scrollY;

  // Add styles to the body
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.body.style.overflowY = 'scroll';

  // Store the scroll position as a data attribute
  document.body.dataset.scrollY = scrollY;
}

// Function to unlock scrolling
function unlockScroll() {
  // Get the stored scroll position
  const scrollY = document.body.dataset.scrollY;

  // Remove the fixed positioning
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';

  // Scroll back to the original position
  window.scrollTo(0, parseInt(scrollY || '0'));
}

// Example usage
/* document.getElementById('openOverlay').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'block';
  lockScroll();
});

document.getElementById('closeOverlay').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  unlockScroll();
}); */
//#endregion scroll lock stuff

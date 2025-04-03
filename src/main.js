import Accordion from 'accordion-js';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios';
import { comment } from 'postcss';

const burgerMenuButton = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const navMenuButton = document.querySelector('.nav-menu-button');
const navMenu = document.querySelector('.nav-list');
const navBlock = document.querySelector('.navigation');
const aboutInfoBlock = document.querySelector('.about-info');
const aboutSwiperBlock = document.querySelector('.about-swiper');
const projectsSwiperBlock = document.querySelector('.projects-swiper');
const faqBlock = document.querySelector('.faq-questions-list');
const reviewsSwiperBlock = document.querySelector('.reviews-swiper');
const reviewsBlock = document.querySelector('.reviews-list');
const contactForm = document.querySelector('.footer-form');
const submitPopUp = document.querySelector('.submit-pop-up');

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
  spaceBetween: 10,
};

new Swiper(projectsSwiperBlock, { ...projectSwiperOptions });

axios.defaults.baseURL = 'https://portfolio-js.b.goit.study/api/';
axios
  .get('reviews')
  .then(function (response) {
    renderReviewList(response.data);
  })
  .catch(function (err) {
    console.log(err);
    reviewsBlock.style.display = 'none';
    document.querySelector('.reviews-fetch-error').style.display = 'block';
    alert(err);
  });

function renderReviewList(renderData) {
  const responseBlockMarkup = [];
  renderData.forEach(item => {
    responseBlockMarkup.push(
      //cuz fuck you swiper
      `<li class="review-card">
        <div class="review-card-wrap"> 
          <img src="${item.avatar_url}" alt="${item.author} photo" class="review-img"/>
          <h3 class="reviewer-name">${item.author}</h3>
          <p class="review-text">${item.review}</p>
        </div>
      </li>`
    );
  });
  reviewsBlock.innerHTML = '';
  reviewsBlock.insertAdjacentHTML('afterbegin', responseBlockMarkup.join(''));
}

const reviewsSwiperOptions = {
  modules: [Navigation, Keyboard],
  navigation: {
    nextEl: '.review-swiper-controlls-next',
    prevEl: '.review-swiper-controlls-prev',
  },
  wrapperClass: 'reviews-list',
  slideClass: 'review-card',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  spaceBetween: 10,
};

new Swiper(reviewsSwiperBlock, { ...reviewsSwiperOptions });

burgerMenuButton.addEventListener('click', e => {
  mobileMenu.style.display = 'block';
  lockScroll();
});

mobileMenu.addEventListener('click', e => {
  if (e.target.nodeName === 'A' || e.target.nodeName === 'BUTTON') {
    mobileMenu.style.display = 'none';
    unlockScroll();
  }
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

const formData = { email: '', comment: '' };
const localStorageKey = 'feedback-form-state';

if (localStorage.getItem(localStorageKey)) {
  const savedFormData = JSON.parse(localStorage.getItem(localStorageKey));
  formData.email = savedFormData.email;
  formData.message = savedFormData.message;
  contactForm.querySelector('input[name="email"]').value = formData.email;
  contactForm.querySelector('input[name="comment"]').value = formData.comment;
}

contactForm.addEventListener('input', event => {
  if (event.target.name === 'email') {
    formData.email = event.target.value;
  }
  if (event.target.name === 'comment') {
    formData.comment = event.target.value;
  }
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email === '' || formData.comment === '') {
    alert('Fill please all fields');
    return;
  }
  axios
    .post('requests', formData)
    .then(response => {
      console.log('axios.response');
      console.log(response);
      showFormSuccess(response.data.title, response.data.message);
    })
    .catch(error => {
      console.log(error);
    });
  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.comment = '';
  contactForm.reset();
});

function showFormSuccess(messageTitle, messageContent) {
  submitPopUp.querySelector('.submit-pop-up-title').textContent = messageTitle;
  submitPopUp.querySelector('.submit-pop-up-text').textContent = messageContent;
  submitPopUp.style.display = 'block';
  lockScroll();
}

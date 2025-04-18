import Accordion from 'accordion-js';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios';

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
const techStackBlock = document.querySelector('.tech-stack');
//document.documentElement.clientWidth and visualViewport.width doesnt include scrollbar
//which in turn makes janky interactions with breakpoints
//because @media (min-width) takes window.innerWidth that include scrollbar width
const viewportWidth = window.innerWidth;

const aboutAccordionOptions = {
  elementClass: 'about-item',
  triggerClass: 'about-info-expand-button',
  panelClass: 'about-panel-wrap',
  showMultiple: true,
};

const faqAccordionOptions = {
  elementClass: 'faq-question-card',
  triggerClass: 'faq-expand-button',
  panelClass: 'faq-answer',
  showMultiple: true,
};

new Accordion(aboutInfoBlock, { ...aboutAccordionOptions });
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
  oneWayMovement: true,
};

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
  spaceBetween: 16,
};

let aboutSwiper;
let reviewsSwiper;
window.addEventListener('load', () => {
  if (viewportWidth > 767) {
    aboutSwiperOptions.slidesPerView = 3;
    reviewsSwiperOptions.slidesPerView = 2;
  }
  if (viewportWidth > 1439) {
    techStackBlockExpand();
    aboutSwiperOptions.slidesPerView = 6;
    reviewsSwiperOptions.slidesPerView = 4;
  }
  aboutSwiper = new Swiper(aboutSwiperBlock, { ...aboutSwiperOptions });
  new Swiper(projectsSwiperBlock, {
    ...projectSwiperOptions,
  });
  reviewsSwiper = new Swiper(reviewsSwiperBlock, {
    ...reviewsSwiperOptions,
  });
});

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  if (aboutSwiper) {
    if (newWidth < 768) {
      techStackBlockRestore();
      aboutSwiper.params.slidesPerView = 2;
    }
    if (newWidth > 767) {
      techStackBlockRestore();
      aboutSwiper.params.slidesPerView = 3;
    }
    if (newWidth > 1439) {
      techStackBlockExpand();
      aboutSwiper.params.slidesPerView = 6;
    }
    aboutSwiper.update();
  }
  if (reviewsSwiper) {
    if (newWidth < 768) reviewsSwiper.params.slidesPerView = 1;
    if (newWidth > 767) reviewsSwiper.params.slidesPerView = 2;
    if (newWidth > 1439) reviewsSwiper.params.slidesPerView = 4;
    reviewsSwiper.update();
  }
});

axios.defaults.baseURL = 'https://portfolio-js.b.goit.study/api/';
axios
  .get('reviews')
  .then(async function (response) {
    await renderReviewList(response.data);
  })
  .catch(function (err) {
    console.log(err);
    reviewsBlock.style.display = 'none';
    document.querySelector('.reviews-fetch-error').style.display = 'block';
    alert(err);
  });

function techStackBlockExpand() {
  techStackBlock.insertAdjacentHTML(
    'beforeend',
    `<li class="tech-name"><p>HTML/CSS</p></li>
          <li class="tech-name"><p>JavaScript</p></li>
          <li class="tech-name"><p>React</p></li>
          <li class="tech-name"><p>Node. js</p></li>
          <li class="tech-name"><p>React Native</p></li>
          <li class="tech-name"><p>Soft skills</p></li>`
  );
}

function techStackBlockRestore() {
  techStackBlock.innerHTML = '';
  techStackBlock.insertAdjacentHTML(
    'beforeend',
    ` <li class="tech-name"><p>HTML/CSS</p></li>
          <li class="tech-name"><p>JavaScript</p></li>
          <li class="tech-name"><p>React</p></li>
          <li class="tech-name"><p>Node. js</p></li>
          <li class="tech-name"><p>React Native</p></li>
          <li class="tech-name"><p>Soft skills</p></li>`
  );
}

function renderReviewList(renderData) {
  const responseBlockMarkup = [];
  renderData.forEach(item => {
    responseBlockMarkup.push(
      //div cuz fuck you swiper
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

burgerMenuButton.addEventListener('click', e => {
  mobileMenu.classList.add('is-open');
  lockScroll();
});

mobileMenu.addEventListener('click', e => {
  if (e.target.nodeName === 'A' || e.target.closest('button')) {
    mobileMenu.classList.remove('is-open');
    unlockScroll();
  }
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
  // Change scroll behavior so it wont give you epilepsy for non-top locks
  document.querySelector('html').style.scrollBehavior = 'auto';
  window.scrollTo(0, parseInt(scrollY || '0'));
  document.querySelector('html').style.scrollBehavior = 'smooth';
}
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
  submitPopUp.classList.add('is-open');
  lockScroll();
}

submitPopUp.addEventListener('click', e => {
  if (e.target.closest('button') || e.target === submitPopUp) {
    submitPopUp.classList.remove('is-open');
    unlockScroll();
  }
});

document.addEventListener('keydown', e => {
  if (submitPopUp.classList.contains('is-open') && e.key === 'Escape') {
    submitPopUp.classList.remove('is-open');
    unlockScroll();
  }
});

document.addEventListener('click', e => {
  if (e.target === navMenuButton) {
    if (navMenu.classList.contains('visually-hidden'))
      navMenu.classList.remove('visually-hidden');
    else navMenu.classList.add('visually-hidden');
  } else if (!navMenu.classList.contains('visually-hidden'))
    navMenu.classList.add('visually-hidden');
});

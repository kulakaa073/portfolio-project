const imageAddresses = [
  {
    x1: './img/cover-powerpulse@1x.png',
    x2: './img/cover-powerpulse@2x.png',
    alt: 'Power Pulse',
  },
  {
    x1: './img/cover-mimino@1x.png',
    x2: './img/cover-mimino@2x.png',
    alt: 'Mimino',
  },
  {
    x1: './img/cover-ua-artistry@1x.png',
    x2: './img/cover-ua-artistry@2x.png',
    alt: 'Ua Artistry',
  },
  {
    x1: './img/cover-green-harvest@1x.png',
    x2: './img/cover-green-harvest@2x.png',
    alt: 'Green Harvest',
  },
  {
    x1: './img/cover-wallet@1x.png',
    x2: './img/cover-wallet@2x.png',
    alt: 'Wallet',
  },
  {
    x1: './img/cover-chego@1x.png',
    x2: './img/cover-chego@2x.png',
    alt: 'Chego',
  },
  {
    x1: './img/cover-energy-flow@1x.png',
    x2: './img/cover-energy-flow@2x.png',
    alt: 'Energy Flow',
  },
  {
    x1: './img/cover-fruitbox@1x.png',
    x2: './img/cover-fruitbox@2x.png',
    alt: 'Fruibox',
  },
  {
    x1: './img/cover-englishexcellence@1x.png',
    x2: './img/cover-englishexcellence@2x.png',
    alt: 'English Excellence',
  },
  {
    x1: './img/cover-starlight-studio@1x.png',
    x2: './img/cover-starlight-studio@2x.png',
    alt: 'Starlight Studio',
  },
];

const slides = imageAddresses
  .map(({ x1, x2, alt }) => {
    return `<li class="slide">
    <img src=${x1} srcset="${x1} 1x, ${x2} 2x" alt="${alt}"/>
  </li>`;
  })
  .join('');

const carousels = [
  document.querySelector('.carousel-from-start-1'),
  document.querySelector('.carousel-from-start-2'),
  document.querySelector('.carousel-from-start-3'),
  document.querySelector('.carousel-from-end-1'),
  document.querySelector('.carousel-from-end-2'),
];

export default function renderSlides() {
  for (let carousel of carousels) {
    carousel.insertAdjacentHTML('beforeend', slides);
  }
}



function initializeSwiperCarousels() {
  const swiperContainers = document.querySelectorAll('.swiper-container');

  swiperContainers.forEach((swiperContainer) => {
    const speed = swiperContainer.getAttribute('data-speed') || 400;
    const spaceBetween = swiperContainer.getAttribute('data-space-between') || 20;
    const paginationEnabled = swiperContainer.getAttribute('data-pagination') === 'true';
    const navigationEnabled = swiperContainer.getAttribute('data-navigation') === 'true';
    const autoplayEnabled = swiperContainer.getAttribute('data-autoplay') === 'true';
    const autoplayDelay = swiperContainer.getAttribute('data-autoplay-delay') || 3000;
    const paginationType = swiperContainer.getAttribute('data-pagination-type') || 'bullets';
    const centerSlides = swiperContainer.getAttribute('data-center-slides') === 'true';
    const effect = swiperContainer.getAttribute('data-effect') || 'slide'; 

    
    const breakpointsData = swiperContainer.getAttribute('data-breakpoints');
    let breakpoints = {};
    if (breakpointsData) {
      try {
        breakpoints = JSON.parse(breakpointsData);
      } catch (error) {
        console.error('Error parsing breakpoints data:', error);
      }
    }

    const swiperOptions = {
      speed: parseInt(speed),
      spaceBetween: parseInt(spaceBetween),
      breakpoints: breakpoints,
      spaceBetween: 30,
      slidesPerView: 'auto',
      effect: effect, 
      freeMode: true,
      centeredSlides: false,
    };

    if (effect === 'fade') {
      swiperOptions.fadeEffect = {
        crossFade: true,
      };
    }

    if (centerSlides) {
      swiperOptions.slidesPerView = 'auto';
      swiperOptions.centeredSlides = true;
    }

    if (paginationEnabled) {
      const paginationEl = swiperContainer.querySelector('.swiper-pagination');
      if (paginationEl) {
        swiperOptions.pagination = {
          el: paginationEl,
          type: paginationType,
          dynamicBullets: true,
          clickable: true,
        };

        
        if (paginationType === 'custom') {
          swiperOptions.pagination.renderCustom = function (swiper, current, total) {
            var text = '';
            for (let i = 1; i <= total; i++) {
              if (current == i) {
                text += `<span class="swiper-pagination-numbers swiper-pagination-numbers-active">${i}</span>`;
              } else {
                text += `<span class="swiper-pagination-numbers">${i}</span>`;
              }
            }
            return text;
          };
        }
      }
    }

    if (navigationEnabled) {
      swiperOptions.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    } else {
      
      const navigationEl = swiperContainer.querySelector('.swiper-navigation');
      if (navigationEl) {
        navigationEl.classList.add('swiper-navigation-hidden');
      }
    }

    if (autoplayEnabled) {
      swiperOptions.autoplay = {
        delay: parseInt(autoplayDelay),
      };
    }

    new Swiper(swiperContainer, swiperOptions);
  });
}

initializeSwiperCarousels();

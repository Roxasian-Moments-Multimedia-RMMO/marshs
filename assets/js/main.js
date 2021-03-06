/**
* MARHS WEBSITE ver. 005 (ALPHA REVISED)
* Developer : RMMO ICT WebDev Team
* Ask Vincent Ferrer for changes/updates
*/

(function (){
  "use strict";
  /**
   * EASY SELECTOR HELPER FUNCTION
   */
   const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  /**
   * EASY EVENT LISTENER FUNCTION
   */
   const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  /**
   * EASY ON SCROLL EVENT LISTENER
   */
   const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  /**
   * NAVIGATION LINKS ACTIVE ON SCROLL
   */
   let navbarlinks = select('#navbar .scrollto', true)
   const navbarlinksActive = () => {
     let position = window.scrollY + 200
     navbarlinks.forEach(navbarlink => {
       if (!navbarlink.hash) return
       let section = select(navbarlink.hash)
       if (!section) return
       if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
         navbarlink.classList.add('active')
       } else {
         navbarlink.classList.remove('active')
       }
     })
   }
   window.addEventListener('load', navbarlinksActive)
   onscroll(document, navbarlinksActive)
  /**
   * SCROLL TO AN ELEMENT WITH A HEADER OFFSET
   */
   const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
      if (!header.classList.contains('header-scrolled')) {
        offset -= 16
      }
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  /**
   * FIXED HEADER TOP ON SCROLL
   */
   let selectHeader = select('#header')
   if (selectHeader) {
     let headerOffset = selectHeader.offsetTop
     let nextElement = selectHeader.nextElementSibling
     const headerFixed = () => {
       if ((headerOffset - window.scrollY) <= 0) {
         selectHeader.classList.add('fixed-top')
         nextElement.classList.add('scrolled-offset')
       } else {
         selectHeader.classList.remove('fixed-top')
         nextElement.classList.remove('scrolled-offset')
       }
     }
     window.addEventListener('load', headerFixed)
     onscroll(document, headerFixed)
   }
  /**
   * BACK TO TOP BUTTON
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }
  /**
   * TOGGLE RESPONSIVE MOBILE NAVIGATION
   */
   on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  /**
   * MOBILE NAVIGATION DROPDOWN ACTIVATION
   */
   on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  /**
   * SCROLL WITH AN OFFSET ON LINKS WITH A CLASS NAME .scrollto
   */
   on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  /**
   * PRELOADER
   */
   let preloader = select ('#preloader');
   if (preloader) {
     window.addEventListener('load', () => {
       preloader.remove()
     });
   }
  /**
   * ANIMATION ON SCROLL (AOS LIBRARY)
   */
   window.addEventListener('load', () => {
      AOS.init({
          duration:1100,
          easing: 'ease-in-out',
          mirror: true,
          offset: 100
      })
  });
  /**
   * INITIATE GLIGHTBOX LIBRARY
   */
   const glightbox = GLightbox ({
      selector: '.glightbox'
  });
  /**
   * ABOUT SWIPER
   */
   var swiper = new Swiper(".aboutSwiper", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freemode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
  });
  var swiper = new Swiper(".aboutSwiper2", {
      loop: true,
      spaceBetween: 5,
      thumbs: {
          swiper: swiper,
      },
  });
  /**
   * ALUMNI SLIDER
   */
   new Swiper('.alumni-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true
    }
  });    
  /**
   * PROGRAM DETAILS SLIDER SWIPER
   */
   new Swiper('.program-details-slider', {
      spaceBetween: 10,
      speed: 400,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        dynamicBullets: true,
        el: '.swiper-pagination',
        clickable: true
      },
      loop: true
    });
  /**
   * JARALLAX
   */
   jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.4,
      disableParallax: false,
      disableVideo: false
  });
  /**
   * EVENT FILTERS
   */
   window.addEventListener('load', () => {
    let portfolioContainer = select('.events-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.event-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#events-filter li', true);

      on('click', '#events-filter li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });
  /**
   * FADE OUT ON SCROLL
   */
   var header = document.getElementById('hero-content');

   function fadeOutOnScroll(element) {
       if (!element) {
           return;
       }
       
       var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
       var elementHeight = element.offsetHeight;
       var scrollTop = document.documentElement.scrollTop;
       
       var opacity = 1;
       
       if (scrollTop > distanceToTop) {
           opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
       }
       
       if (opacity >= 0) {
           element.style.opacity = opacity;
       }
   }
   
   function scrollHandler() {
       fadeOutOnScroll(header);
   }
   
   window.addEventListener('scroll', scrollHandler);    
})();

/**
* SCROLL INTO VIEW
*/
function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ 
      block: 'start',  behavior: 'smooth' 
  });
}


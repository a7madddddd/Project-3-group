

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();




  // form 1 contact
// document.getElementById("form1").addEventListener("submit", (event)=>{
  
//   const firstName = document.getElementById('firstname').value
//   const lastName = document.getElementById('lastname').value
//   const phone = document.getElementById('phone').value
//   const email = document.getElementById('email').value
//   const subject = document.getElementById('subject').value
//   const description = document.getElementById('description').value


//   // form 1 contact storage
//   localStorage.setItem('First Name', firstName);
//   localStorage.setItem('Last Name', lastName);
//   localStorage.setItem('Phone', phone);
//   localStorage.setItem('Email', email);
//   localStorage.setItem('Subject', subject);
//   localStorage.setItem('Description', description);

//   alert('Your contact response has been recorded.!')
//   event.defaultPrevented();
// });


//   // form 2 feedback
//   document.getElementById('form2').addEventListener('submit', (x)=>{
    
    
//    const userName = document.getElementById('username').value
//    const date = document.getElementById('date').value
//    const position = document.getElementById('position').value
//    const email2 = document.getElementById('email2').value
//    const problems =  document.getElementById('problems').value
//    const description = document.getElementById('description2').value

//     // form 2 feedback storage
//     localStorage.setItem('User Name', userName)
//     localStorage.setItem('Date', date)
//     localStorage.setItem('Position', position)
//     localStorage.setItem('Email', email2)
//     localStorage.setItem('Problem', problems)
//     localStorage.setItem('Description', description)

//     alert('Your feedback response has been recorded.!')
//     x.defaultPrevented();

//   });

// 


  // form 1 contact
document.getElementById("form1").addEventListener("submit", (y)=>{
  
  const firstName = document.getElementById('firstname').value
  const lastName = document.getElementById('lastname').value
  const phone = document.getElementById('phone').value
  const email = document.getElementById('email').value
  const subject = document.getElementById('subject').value
  const description = document.getElementById('description').value

// form 1 storage contact
const form1 = {
 ' First Name ': firstName,
  'Last Name':lastName,
  'Phone':phone,
  'Email':email,
  'Subject':subject,
  'Description':description
}
let contact_array1=JSON.parse(localStorage.getItem('contact_array1')) || []
 console.log(form1)

contact_array1.push(form1)

localStorage.setItem('contact_array1', JSON.stringify(contact_array1))



alert('Your contact response has been recorded.!')
  y.defaultPrevented();

});

//////////////////////////////////////////////////////////////////////
// 
// 
//   // form 2 feedback
  document.getElementById('form2').addEventListener('submit', (x)=>{
    
    
   const userName = document.getElementById('username').value
   const date = document.getElementById('date').value
   const position = document.getElementById('position').value
   const email2 = document.getElementById('email2').value
   const problems =  document.getElementById('problems').value
   const description = document.getElementById('description2').value

    // form 2 feedback storage
    const form2={
      'User Name':userName,
      'Date':date,
      'Position':position,
      'Email':email2,
      'Problems':problems,
      'Description':description,
    }


    let feedback_array2= JSON.parse(localStorage.getItem('feedback_array2')) || []
    console.log(form2)
  


    feedback_array2.push(form2)
    localStorage.setItem('feedback_array2', JSON.stringify(feedback_array2))

    alert('Your feedback response has been recorded.!')
    x.defaultPrevented();






 document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('itemForm');
            const input = document.getElementById('itemInput');
            const cardContainer = document.getElementById('cardContainer');

            // Function to create and display cards
            const createCard = (text) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.textContent = text;
                cardContainer.appendChild(card);
            };

            // Add item and display as card
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const itemText = input.value.trim();
                if (itemText) {
                    createCard(itemText);
                    input.value = '';
                }
            });
        });




     
    })




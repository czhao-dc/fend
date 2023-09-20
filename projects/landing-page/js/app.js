/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.navbar__menu');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let sectionsArr = Array.from(sections);

function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
    // rect.top >= 0 &&
    // rect.left >= 0 &&

    // rect.bottom <= (window.innerHeight + 100) &&
    // rect.right <= (window.innerWidth)

    rect.top <= 150 &&
    rect.bottom >= 150

  );
}

function addActiveClass(element) {
  element.classList.add('your-active-class');
}

function removeActiveClass(element) {
  element.classList.remove('your-active-class');
}

function toggleMenu() {
  toggle.addEventListener('click', function () {
      if (menu.classList.contains('active')) {
          menu.classList.remove('active');
          // add hamburger icon
          toggle.querySelector('a').innerHTML = '<i class="fas fa-bars"></i>';
      } else {
          menu.classList.add('active');
          // add close(x) icon
          toggle.querySelector('a').innerHTML = '<i class="fas fa-times"></i>';
      }
  }, false);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function generatenav() {

  for (const section of sections) {
    let navListItem = `
        <li class="menu__link" data-link="${section.dataset.nav}">
            <a href="#${section.getAttribute('id')}">${section.dataset.nav}</a>
        </li>`;
    navbarList.innerHTML += navListItem;
}

  }

function setActiveClass() {
    window.addEventListener('scroll', function () {
        for (const section of sections) {
            const activeLink = document.querySelector(`[data-link="${section.dataset.nav}"]`)
            if (isInViewport(section)) {
                addActiveClass(section);
                addActiveClass(activeLink);
            } else {
                removeActiveClass(section);
                removeActiveClass(activeLink);
            }
        }
    });
  }


function scrollTo() {
    navbarList.addEventListener('click', function (e) {
        e.preventDefault();
        el = document.querySelector(e.target.getAttribute('href'));
        el.scrollIntoView({ behavior: "smooth" });
    });
  }
  
//source: https://stackoverflow.com/questions/70320295/i-am-trying-to-create-nav-bar-which-dynamically-updated-with-adding-a-sections-t



// https://stackoverflow.com/questions/64443779/sections-in-position-getboundingclientrect




/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
generatenav();
// Scroll to section on link click
scrollTo();
// Set sections as active
setActiveClass();
//Toggle menu
toggleMenu();





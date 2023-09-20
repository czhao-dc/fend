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
//const sections = Array.from(document.querySelectorAll)

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
//source: https://stackoverflow.com/questions/70320295/i-am-trying-to-create-nav-bar-which-dynamically-updated-with-adding-a-sections-t
// const nav = document.querySelector("nav");
// const navbarList = document.querySelector('#navbar__list');
// const nav_bar = document.querySelector(".navbar__menu");
// const sections = document.querySelectorAll()
const navbarList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.navbar__menu');



// const nav_menu_items = () => {
//   let nav_menu_container = '';

// sections.forEach(section => {

//      const sectionID = section.id;
//      const sectionAtrribute = section.dataset.nav;
//      nav_menu_container += `<li> <a class="menu_item_link" href="#${sectionID}">${sectionAtrribute}</a></li>`   
//    })
// menu.innerHTML=nav_menu_container;
// }

// for (const section of sections) {
//     console.log('hahahh');
//     const a = document.createElement("a");
//     a.innerText = section.dataset.linkText;
//     a.href = "#"+section.id;
//     nav.appendChild(a);
//   }

// function isInViewport(el) {
//   const bounds = el.getBoundingClientRect();
//   return (
//       bounds.top >= 0 &&
//       bounds.left >= 0 &&
//       bounds.bottom <= (window.innerHeight + 100) &&
//       bounds.right <= (window.innerWidth)
//   );
// }


// function addActive(el) {
//   el.classList.add('your-active-class');
// }

// function removeActive(el) {
//   el.classList.remove('your-active-class');
// }

// function toggleMenu() {
//   toggle.addEventListener('click', function () {
//       if (menu.classList.contains('active')) {
//           menu.classList.remove('active');
//           // add hamburger icon
//           toggle.querySelector('a').innerHTML = '<i class="fas fa-bars"></i>';
//       } else {
//           menu.classList.add('active');
//           // add close(x) icon
//           toggle.querySelector('a').innerHTML = '<i class="fas fa-times"></i>';
//       }
//   }, false);
// }




//generatenav()


// https://stackoverflow.com/questions/64443779/sections-in-position-getboundingclientrect


let sectionsArr = Array.from(sections);

function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    //rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    rect.bottom <= (window.innerHeight + 100) &&
    rect.right <= (window.innerWidth)
  );
}

function addActiveClass(element) {
  element.classList.add('your-active-class');
}

function removeActiveClass(element) {
  element.classList.remove('your-active-class');
}

function scrollTo() {
  navbarList.addEventListener('click', function (e) {
      e.preventDefault();
      el = document.querySelector(e.target.getAttribute('href'));
      el.scrollIntoView({ behavior: "smooth" });
  });
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
// function setActiveClass(){
//   window.addEventListener('scroll', function () {
//   for (let i=0; i < sectionsArr.length; i++){
//       if (isInViewport(sectionsArr[i])){
//           sectionsArr[i].classList.add("your-active-class");
//           console.log(sectionsArr);
//       }else{
//           sectionsArr[i].classList.remove("your-active-class");
//       }
//   }})}


function generatenav() {
  // for (const section of sections) {
  //   let navListItem = `
  //   <li class="menu__link" data-link="${section.dataset.nav}">
  //       <a href="#${section.getAttribute('id')}">${section.dataset.nav}</a>
  //   </li>`;
  //   navbarList.innerHTML += navListItem;

  // }

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




generatenav();

scrollTo();

setActiveClass();

toggleMenu();

// function setActive() {
//     window.addEventListener('scroll', function () {
//         for (const section of sections) {
//             const activeLink = document.querySelector(`[data-link="${section.dataset.nav}"]`)
//             if (isInViewport(section)) {
//                 addActive(section);
//                 addActive(activeLink);
//             } else {
//                 removeActive(section);
//                 removeActive(activeLink);
//             }
//         }
//     });
// }


// function scrollTo() {
//   if (navbarList) {
//   navbarList.addEventListener('click', function (e) {
//       e.preventDefault();
//       el = document.querySelector(e.target.getAttribute('href'));
//       el.scrollIntoView({ behavior: "smooth" });
//     })};
// }




// scrollTo();

// // Set sections as active
// setActive();

// // Toggle mobile menu
// toggleMenu();
// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



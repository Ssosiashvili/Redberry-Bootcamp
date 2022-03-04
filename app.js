'use strict';

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});


const formPages = document.querySelectorAll('.form-group');
const redberryPages = document.querySelectorAll('.about-redberry');
const bullets = document.querySelectorAll('.bullet');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let activeIndex = 0;

nextBtn.addEventListener('click', showNextPage);
prevBtn.addEventListener('click', showPrevPage);

function renderPages(){
  formPages.forEach((page, i) => {
    activeIndex === i ? page.classList.add('active') : page.classList.remove('active');
  })
   redberryPages.forEach((page, i) => {
     activeIndex === i ? page.classList.add('active') : page.classList.remove('active');
   })
}
function showNextPage(){
  (activeIndex === formPages.length - 1) ? activeIndex = 0 : activeIndex++;
    renderPages();
}

function showPrevPage(){
   (activeIndex === 0) ? activeIndex = formPages.length - 1 : activeIndex--;
    renderPages();
}

nextBtn.addEventListener("click", nextStep)

function nextStep() {
  var input = document.getElementById("phone");
  if (input.validity.patternMismatch) {
    console.log("Bad input detected…");
  } else {
    console.log("Content of input OK.");
  }
}

let skills = [];
function getRequest() {
  fetch('https://bootcamp-2022.devtest.ge/api/skills').then(function(r) {
    return r.json();
  }).then(function(r) {
    console.log(r);
    skills=r;
    console.log(...skills)
    renderData(r)
  })
};
getRequest();
function renderData(data) {
  let options = document.querySelector('#skills')
  for(let i = 0; i < data.length; i++) {
    let list = document.createElement('option');
    list.innerHTML = `${data[i].title}`;
    options.appendChild(list);
     console.log(list.innerHTML)
  };
};
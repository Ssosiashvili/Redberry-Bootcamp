'use strict';

const TOKEN = '0f15932a-e354-4c54-bf22-a716438f519d'
var SKILLS = {}

const info = {token: TOKEN, skills: []};

function setFieldInfo(e) {
  info[e.name] = e.value

  console.log(SKILLS)

  console.log(info)
}

function setSkillInfo(e) {

}

const phoneInputField = document.querySelector("#phone");
// const phoneInput = window.intlTelInput(phoneInputField, {
//   utilsScript:
//     "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// });


const formPages = document.querySelectorAll('.form-group');
const redberryPages = document.querySelectorAll('.about-redberry');
const bullets = document.querySelectorAll('.bullet');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const goBackBtn = document.querySelector('#go-back');

let activeIndex = 0;


function localStorageSetter(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value))
}

nextBtn.addEventListener('click', showNextPage);
prevBtn.addEventListener('click', showPrevPage);
goBackBtn.addEventListener('click', backFromLast);

function renderPages(){
  formPages.forEach((page, i) => {
    activeIndex === i ? page.classList.add('active') : page.classList.remove('active');
  })
   redberryPages.forEach((page, i) => {
     if(activeIndex!== redberryPages.length-1) {
     activeIndex === i ? page.classList.add('active') : page.classList.remove('active');
    }else {
      showLastPage(page);
    }
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

function backFromLast() {
  activeIndex = formPages.length - 2;
  document.querySelector(".right-side").classList.remove('hidden');
  document.querySelector(".left-side").classList.remove('full-screen');
  document.querySelector(".buttons").classList.remove('hidden')
  renderPages();
}

function showLastPage(page) {
  page.classList.remove('active');
  document.querySelector(".right-side").classList.add('hidden');
  document.querySelector(".left-side").classList.add('full-screen');
  document.querySelector(".buttons").classList.add('hidden')
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
    SKILLS = r
    console.log(r);
    skills=r;
    console.log(skills)
    renderData(r)
  })
};
getRequest();
let optionsArr = [];
let submittedNames = []
let list;
function renderData(data) {
  let options = document.querySelector('#skills')
  for(let i = 0; i < data.length; i++) {
    list = document.createElement('option');
    
    list.innerHTML = `${data[i].title}`;
    options.appendChild(list);
    list.classList.add('selected')
    // document.querySelectorAll(".selected")[i].addEventListener("click", function() {
    //   console.log('yep')
    // })
    console.log(list);
    console.dir(document.querySelectorAll(".selected")[i])
    optionsArr.push(`${data[i].title}`);
  };

  console.log(optionsArr)
  return list;
};
console.log(optionsArr)
console.log(list);


let displayLanguage = function (event) { 
  event.preventDefault()
  let selectElement = document.querySelector('#skills');
  let output = selectElement.value;
  let experience = document.querySelector('#experience-years').value
  let language = document.createElement('div');
  language.value = output;
  language.id = output;
  language.className = 'added';
  language.innerHTML = `
  <div class="language">${output}</div>
  <div id ="expreience-text">Years of Experience: </div>
  <div class ="experience-years">${experience}</div>
  <img id =${output}-btn onclick="removeSelected(this)" src="images/remove.png" alt="remove-btn">
  `;
  document.querySelector(".added-language").appendChild(language);
  let selected = document.querySelectorAll(".selected") 
  selected.forEach((item => {
    if(item.value===output) {
      item.hidden= true
    }

  }))

  console.dir (selected)
  console.log("LANGUAGE", language)
}
document.querySelector(".add-language-btn").addEventListener("click", displayLanguage)

function removeSelected (e) {
console.dir(e)
const selectedLanguage = e.id.substring(0,e.id.length-4)
console.log(selectedLanguage);
let languageBack = document.querySelectorAll(".selected")

languageBack.forEach((i) =>{
  console.log(selectedLanguage, i.value)
  if(selectedLanguage===i.value) {
    i.hidden= false;
  }
})
}
'use strict';

const TOKEN = '0b9f51f8-c55d-4391-80c6-9fb22bb5e9aa'
let SKILLS = {}

const info = {token: TOKEN, skills: [

]};

function setFieldInfo(e) {
  if(e.value=="true"||e.value=="false") {
    info[e.name] = JSON.parse(e.value)
  }else{
  info[e.name] = e.value
  }
}


const formPages = document.querySelectorAll('.form-group');
const redberryPages = document.querySelectorAll('.about-redberry');
const bullets = document.querySelectorAll('.bullet');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const goBackBtn = document.querySelector('#go-back');

let activeIndex = 0;

//nextBtn.addEventListener('click', showNextPage);
prevBtn.addEventListener('click', showPrevPage);
goBackBtn.addEventListener('click', backFromLast);

function localStorageSetter(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value))
}

for(let i = 0; i < bullets.length; i++) {
  bullets[i].addEventListener('click', function() {
    switchTo(i);
  });
}

function renderPages(){
  formPages.forEach((page, i) => {
    activeIndex === i ? page.classList.add('active') : page.classList.remove('active');
  })
  bullets.forEach((page, i) => {
    activeIndex === i ? page.classList.add('current') : page.classList.remove('current');
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
function switchTo(newIndex) {
  activeIndex = newIndex;
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

//nextBtn.addEventListener("click", nextStepChekValidity)

function nextStepChekValidity(input) {
  // let input = document.querySelectorAll(".for-test");
  // for (let i=0; i< input.length; i++) {
  //   console.log(input[i].value)
    console.log("shemovida")
    if(input.value =="") {
      input.nextElementSibling.innerHTML = "* this field is required";
      nextBtn.removeEventListener('click', showNextPage)
    }else if(input.validity.tooShort) {
      input.nextElementSibling.innerHTML = "* use at least 2 symbols"
      nextBtn.removeEventListener('click', showNextPage)
    }else if(input.validity.typeMismatch) {
      input.nextElementSibling.innerHTML = "* input correct email adress"
      nextBtn.removeEventListener('click', showNextPage)
    } else if(input.validity.patternMismatch) {
      input.nextElementSibling.innerHTML = "* input does not match required pattern"
      nextBtn.removeEventListener('click', showNextPage)
    }else {
      input.nextElementSibling.innerHTML ="";
      nextBtn.addEventListener('click', showNextPage)
    }
  // }
}

let skills = [];
function getRequest() {
  fetch('https://bootcamp-2022.devtest.ge/api/skills').then(function(r) {
    return r.json();
  }).then(function(r) {
    SKILLS = r
    renderData(r)
  })
};

getRequest();
let list;

function renderData(data) {
  let options = document.querySelector('#skills')
  for(let i = 0; i < data.length; i++) {
    list = document.createElement('option');
    list.innerHTML = `${data[i].title}`;
    options.appendChild(list);
    list.classList.add('selected')
  };
};


let displayLanguage = function (event) { 
  event.preventDefault();
  let selectElement = document.querySelector('#skills');
  let output = selectElement.value;
  let experience = document.querySelector('#experience-years').value
  let language = document.createElement('div');
  language.value = output;
  language.id = output;
  language.className = 'added-language';
  const neededSkill = SKILLS.find(skill => skill.title == output)
  const newSkill = {
    id: neededSkill.id,
    experience: Number(experience)
  }
  info.skills.push(newSkill);

  language.innerHTML = `
  <div class="language">${output}</div>
  <div class ="experience-text">Years of Experience: </div>
  <div class ="experience-years">${experience}</div>
  <img id =${output}-btn onclick="removeSelected(this);removeParent(this);"src="images/remove.png" alt="remove-btn">
  `;

  document.querySelector(".skills-form").appendChild(language);
  let selected = document.querySelectorAll(".selected") 
  selected.forEach((item => {
    if(item.value===output) {
      item.hidden = true;
    }
  }));
}

document.querySelector(".add-language-btn").addEventListener("click", displayLanguage)

function removeSelected (e) {
  const selectedLanguage = e.id.substring(0,e.id.length-4)
  let languageBack = document.querySelectorAll(".selected")

  for (let i = 0; i < languageBack.length; i++) {
    if(selectedLanguage===languageBack[i].value) {
      languageBack[i].hidden= false;
    }
  }
  const neededSkill = SKILLS.find(skill => skill.title == selectedLanguage)

  const filtered = info.skills.filter(item => {
    if (item.id == neededSkill.id) {
      return false
    } else {
      return true
    }
  })
  info.skills = filtered
};

function removeParent(e) {
  e.parentElement.remove();
}

document.querySelector('form').addEventListener('submit', function(e) {
  sendPostRequest(info);
  e.preventDefault();
  // thanksForJoining();
  //backLandingPage();
});

function sendPostRequest(data) {
  fetch('https://bootcamp-2022.devtest.ge/api/application', {
  method: "POST",
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify(data)
}).then(res => {
  console.log("Request complete! response:", res);  
});
}

// function thanksForJoining() {
//   window.location.replace("thanks.html");
// }
// function backLandingPage() {
//   window.location.href = "index.html";
//   location(reload);
// }
function yesnoCheckVaccinated() {
  if (document.getElementById('vaccinated').checked) {
    document.getElementById('vaccinate-date').style.display = 'block';
    document.getElementById('when-vaccinated').style.display = 'block';
    document.getElementById('when-vaccinated').attributes.required = "required";

  }else{
  document.getElementById('vaccinate-date').style.display = 'none';
  document.getElementById('when-vaccinated').style.display = 'none';
  document.getElementById('when-vaccinated').attributes.required = "";
  }
}

function yesnoCheckCovid() {
  if (document.getElementById('yes-covid').checked) {
    document.getElementById('when-get-covid').style.display = 'block';
    document.getElementById('contact-date').style.display = 'block'; 
    document.getElementById('contact-date').required = "required";
  }else{
  document.getElementById('when-get-covid').style.display = 'none';
  document.getElementById('contact-date').style.display = 'none';
  document.getElementById('contact-date').required = "";
  }
}
function yesnoCheckdevTalk() {
  if (document.getElementById('devtalks').checked) {
    document.getElementById('devtalk_header').style.display = 'block';
    document.getElementById('devtalk-text').style.display = 'block'; 
    document.getElementById('devtalk-text').required = "required";
  }else{
  document.getElementById('devtalk_header').style.display = 'none';
  document.getElementById('devtalk-text').style.display = 'none';
  document.getElementById('devtalk-text').required = "";
  }
}



// document.querySelector('.sumbitted').addEventListener("click", getRequestApplication);

let receivedForm = null;
function getRequestApplication() {
  fetch(`https://bootcamp-2022.devtest.ge/api/applications?token=${TOKEN}`).then(function(r) {
    return r.json();
  }).then(function(r) {
    receivedForm=r;
    localStorage.setItem("FORM_INFO", JSON.stringify(r))
  })
};

getRequestApplication();
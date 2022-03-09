'use strict';

const TOKEN = '0f15932a-e354-4c54-bf22-a716438f519d'
var SKILLS = {}

const info = {token: TOKEN, skills: [
  {
    "id": 1,
    "experience": 3
  }
]};

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

//nextBtn.addEventListener('click', showNextPage);
prevBtn.addEventListener('click', showPrevPage);
goBackBtn.addEventListener('click', backFromLast);

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

nextBtn.addEventListener("click", nextStepChekValidity)

function nextStep() {
  var input = document.getElementById("phone");
  if (input.validity.patternMismatch) {
    console.log("Bad input detected…");
  } else {
    console.log("Content of input OK.");
  }
}

function nextStepChekValidity() {
  let input = document.querySelectorAll(".for-test");
  for (let i=0; i< input.length; i++) {
    console.log(input[i].value)
    if(input[i].value =="") {
      input[i].nextElementSibling.innerHTML = "this field is required";
      console.log("this field is required")
    }else if(input[i].validity.tooShort) {
      input[i].nextElementSibling.innerHTML = "at least 2 symbols"
      console.log("at least 2 symbols");
    }else if(input[i].validity.typeMismatch) {
      input[i].nextElementSibling.innerHTML = "input email adress"
      console.log("at least 2 symbols");
    } else if(input[i].validity.patternMismatch) {
      input[i].nextElementSibling.innerHTML = "use correct pattern"
    }
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
  language.className = 'added-language';
  language.innerHTML = `
  <div class="language">${output}</div>
  <div class ="experience-text">Years of Experience: </div>
  <div class ="experience-years">${experience}</div>
  <img id =${output}-btn onclick="removeSelected(this);removeParent(this);"src="images/remove.png" alt="remove-btn">
  `;
  document.querySelector(".skills-form").appendChild(language);
  let selected = document.querySelectorAll(".selected") 
  selected.forEach((item => {
    console.log(item);
    if(item.value===output) {
      item.hidden = true;
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

  for (let i = 0; i < languageBack.length; i++) {
    if(selectedLanguage===languageBack[i].value) {
      languageBack[i].hidden= false;
    }
  }
};

function removeParent(e) {
  e.parentElement.remove();
}

document.querySelector('form').addEventListener('submit', function(e) {
  fetch('https://bootcamp-2022.devtest.ge/api/application', {
  method: "POST",
  headers: {'Content-Type': 'application/json'}, 
  body: testdata
}).then(res => {
  console.log("Request complete! response:", res);
  console.log(testdata)
});
  e.preventDefault();
});



// function sendRequest(data) {
//   return fetch('https://bootcamp-2022.devtest.ge/api/application', {
//     method: 'POST',
//     // headers: {
//     //    'Content-Type': 'application/x-www-form-urlencoded',
//     // },
//     body: data
//   })
//  .then(function(r) {
//    console.log(data)
//     return r.json();
//   });
//}


let testdata = {
  "token": '0f15932a-e354-4c54-bf22-a716438f519d',
  "first_name": "Soso",
  "last_name": "sosiashvili",
  "email": "sosiashvili@gmail.como",
  "phone": "+995514418181",
  "skills": [
    {
      "id": 1,
      "experience": 3
    }
  ],
  "work_preference": "from_home",
  "had_covid": true,
  "had_covid_at": "2022-02-23",
  "vaccinated": true,
  "vaccinated_at": "2022-02-23",
  "will_organize_devtalk": true,
  "devtalk_topic": "dont know yet",
  "something_special": "meh"
}


// fetch('https://bootcamp-2022.devtest.ge/api/application', {
//   method: "POST",
//   headers: {'Content-Type': 'application/json'}, 
//   body: testdata
// }).then(res => {
//   console.log("Request complete! response:", res);
// });
  //let testdata =
  // {
  //   token: '0f15932a-e354-4c54-bf22-a716438f519d',
  //   first_name: "Soso",
  //   last_name: "sosiashvili",
  //   email: "sosiashvili@gmail.como",
  //   phone: "",
  //   skills: [
  //     {
  //       id: 1,
  //       experience: 3
  //     }
  //   ],
  //   work_preference": "from_home",
  //   had_covid: true,
  //   had_covid_at: "2022-02-23",
  //   vaccinated": true,
  //   vaccinated_at: "2022-02-23",
  //   will_organize_devtalk": true,
  //   devtalk_topic: "dont know yet",
  //   something_special: "meh"
  // }
  
  // getRequest1(TOKEN);
  // function getRequest1() {
  //   fetch('https://bootcamp-2022.devtest.ge/api/applications').then(function(r) {
  //     return r.json();
  //   }).then(function(r) {
  //     console.log(r);

  //   })
  // };

function yesnoCheckVaccinated() {
  if (document.getElementById('vaccinated').checked) {
    document.getElementById('vaccinate-date').style.display = 'block';
    document.getElementById('when-vaccinated').style.display = 'block'; 
  }else{
  document.getElementById('vaccinate-date').style.display = 'none';
  document.getElementById('when-vaccinated').style.display = 'none';
  }
}

function yesnoCheckCovid() {
  if (document.getElementById('vaccinated').checked) {
    document.getElementById('vaccinate-date').style.display = 'block';
    document.getElementById('when-vaccinated').style.display = 'block'; 
  }else{
  document.getElementById('vaccinate-date').style.display = 'none';
  document.getElementById('when-vaccinated').style.display = 'none';
  }
}

function getRequest1() {
  fetch(`https://bootcamp-2022.devtest.ge/api/applications?token=${TOKEN}`).then(function(r) {
    return r.json();
  }).then(function(r) {
    console.log(r);
    skills=r;
    console.log(skills)
  })
};

getRequest1();
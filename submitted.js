const form = localStorage.getItem("FORM_INFO");
const data = JSON.parse(form);



let skillsArr=[];
renderSubmittedApplications();
function renderSubmittedApplications(){
    for (let i=0; i<data.length; i++) {
        let createdDiv = document.createElement('div');
        document.querySelector('.submitted-container').appendChild(createdDiv);
        createdDiv.classList.add('application-container');
        skillsArr.push(data[i].skills);
        createdDiv.innerHTML=`                
        <div class="dropdown row-flex">
            <div class="for-index">${i+1}</div>
            <div class="for-arrow"> <img src="images/donw.svg" alt="donw-arrow"></div>
        </div>
        
        <div class="application row-flex display-none">
            <div class="personal-information">
                <h4 class="application-header personal-info-header" >personal information</h4>
                <div class="row-flex for-fields">
                    <div class="field">First Name</div> <div class="right-field">${data[i].first_name}</div>
                </div>
                <div class="row-flex for-fields">
                    <div class="field">Last Name</div> <div class="right-field">${data[i].last_name}</div>
                </div>
                <div class="row-flex for-fields">
                    <div class="field">E mail</div> <div class="right-field">${data[i].email}</div>
                </div>
                <div class="row-flex for-fields">
                    <div class="field">Phone</div> <div class="right-field">${data[i].phone}</div>
                </div>
            </div>
            <div class="skillset column-flex">
                <h4 class="application-header">skillset</h4>
            </div> 
            <div class="covid-situation column-flex">
                <h4 class="application-header">Covid Situation</h4>

                <h5 class="sub-header">how would you prefer to work?</h5>
                <div class="option">
                    <input type="radio" id="from_Office/submited" name="work_preference/submited" readonly>
                    <label for="from_Office/submited">From Sairme Office</label>
                </div>
                <div class="option">
                    <input type="radio" id="from_home/submited" name="work_preference/submited" readonly>
                    <label for="from_home/submited">From Home</label>
                </div>
                <div class="option last-option">
                    <input type="radio" id="hybrid/submited" name="work_preference/submited" readonly>
                    <label for="hybrid/submited">Hybrid</label>
                </div>

                <h5 class="sub-header">Did you have covid 19?</h5>
                <div class="option">
                    <input type="radio" id="yes/submited" name="had_covid/submited" value="yes/submited" readonly>
                    <label for="yes/submited">Yes</label>
                </div>
                <div class="option last-option">
                    <input type="radio" id="no/submited" name="had_covid/submited" value="no/submited" readonly>
                    <label for="no/submited">No</label>
                </div>

                <h5 class="sub-header"> When did you have covid 19?</h5>
                <div class="date-submitted" id="contact-datesubmited"> ${data[i].had_covid_at}</div>
                
                
                <h5 class="sub-header">Have you been vaccinated?</h5>
                <div class="option">
                    <input type="radio" id="vaccinated/submited" name="vaccinated/submited" value="vaccinated/submited" readonly>
                    <label for="vaccinated/submited">Yes</label>
                </div>
                <div class="option last-option">
                    <input type="radio" id="not-vaccinated/submited" name="vaccinated/submited" value="not-vaccinated/submited" readonly>
                    <label for="not-vaccinated/submited">No</label>
                </div>
                <h5 class="sub-header">When did you get covid vaccine?</h5>
                <div class="date-submitted" id="vaccinate-date/submited"> ${data[i].vaccinated_at}</div>
            </div>
            <div class="insight">
                <h4 class="application-header">Insights</h4>
                <h5 class="sub-header">Would you attend Devtalks and maybe also organize your own?</h5>
                <div class="option">
                    <input type="radio" id="devtalks/submited" name="will_organize_devtalk/submited" value="yes-devtalks/submited" readonly>
                    <label for="yes-devtalks/submited">Yes</label>
                </div>
                <div class="option last-insight-option">
                    <input type="radio" id="no-devtalks/submited" name="will_organize_devtalk/submited" value="no-devtalks/submited" readonly>
                    <label for="no-devtalks/submited">No</label>
                </div>

                <h5 class="sub-header">What would you speak about at Devtalk?</h5>
                <input class="textarea-place" type="textarea" class="topic-text/submited" name="devtalk_topic/submited" value="${data[i].devtalk_topic}"; readonly>
        
                <h5 class="sub-header">Tell us somthing special</h5>
                <input class="textarea-place" type="textarea" class="something_special/submited" name="something_special/submited" value="${data[i].something_special}"; readonly>
            </div>
        </div>
        `;
    }   
    
    for(let i = 0; i < skillsArr.length; i++){
        for(let x = 0; x < skillsArr[i].length; x++){
            if(skillsArr[i][x].id === 1){
                skillsArr[i][x].value = "HTML";
            } else
            if(skillsArr[i][x].id == 2){
                skillsArr[i][x].value = "CSS";
            }else
            if(skillsArr[i][x].id == 3){
                skillsArr[i][x].value = "PHP";
            }else
            if(skillsArr[i][x].id == 4){
                skillsArr[i][x].value = "Laravel";
            }else
            if(skillsArr[i][x].id == 5){
                skillsArr[i][x].value = "React.JS";
            }else
            if(skillsArr[i][x].id == 6){
                skillsArr[i][x].value = "Vue.JS";
            }else
            if(skillsArr[i][x].id == 7){
                skillsArr[i][x].value = "Svelte";
            }else
            if(skillsArr[i][x].id == 8){
                skillsArr[i][x].value = "Angular";
            }
        }    
    }

    let createdSkillsDiv;
    let skillset = document.querySelectorAll('.skillset');
    for (let i=0; i < data.length; i++ ) {
        createdSkillsDiv = document.createElement('div');
        createdSkillsDiv.classList.add('column-flex', 'for-fields');
        skillset[i]?.appendChild(createdSkillsDiv);

        for(let x = 0; x < data[i].skills.length; x++){
            createdSkillsSubDiv = document.createElement('div');
            createdSkillsSubDiv.classList.add('row-flex');
            createdSkillsSubDiv.innerHTML =`<div class="field">${skillsArr[i][x].value}</div> <div class="right-field">years of experience: ${data[i].skills[x].experience}</div>` 
            createdSkillsDiv.appendChild(createdSkillsSubDiv)
        }
    }
    //<div class="field">${data[i].skills.id}</div> <div class="right-field">years of experience: ${data[i].skills.experience}</div>
    const applicationDiv = document.querySelectorAll(".application");
    applicationDiv[data.length-1].classList.remove('display-none');
    let arrowToShow = document.querySelectorAll(".for-arrow");
    for(let i=0; i<arrowToShow.length; i++) {
        arrowToShow[i].addEventListener('click', function(){
            applicationDiv[i].classList.toggle(('display-none'));
        })
    }
}
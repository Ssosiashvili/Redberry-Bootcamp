const form = localStorage.getItem("FORM_INFO")

// let languages = {
//     html = 1,
//     css = 2,
//     php = 3,
//     laravel = 4,
//     react = 5,
//     vue = 6,
//     svelte = 7,
//     angular =8,

// }
const data = JSON.parse(form)
let skillsArr=[];
renderSubmittedApplications();
function renderSubmittedApplications(){
    for (let i=0; i<data.length; i++) {
        let createdDiv = document.createElement('div');
        document.querySelector('.submitted-container').appendChild(createdDiv);
        createdDiv.classList.add('application-container');
        //console.log(data[i].skills[i]?.id, data[i].skills[i]?.experience);
        skillsArr.push(data[i].skills);
        console.log(skillsArr)
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
            <div class="skillset">
                <h4 class="application-header">skillset</h4>
                <div class="row-flex for-fields">
                    <div class="field">php</div> <div class="right-field">years of experience: 3</div>
                </div>
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

                <h5 class="sub-header"> Did you have covid 19?</h5>
                <input type="date" class="date-submitted" id="contact-datesubmited" name="had_covid_atsubmited" placeholder="date" readonly>
                
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
                <input type="date" class="date-submitted" id="vaccinate-date/submited" name="vaccinated_at/submited" placeholder="date" readonly>
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
                <input class="textarea-place" type="textarea" class="topic-text/submited" name="devtalk_topic/submited" value="I would speak about subject of how to center a div" readonly>
        
                <h5 class="sub-header">Tell us somthing special</h5>
                <input class="textarea-place" type="textarea" class="something_special/submited" name="something_special/submited" value="I can deBUG anything!" readonly>
            </div>
        </div>
        `;
    }
    const applicationDiv = document.querySelectorAll(".application");
    applicationDiv[data.length-1].classList.remove('display-none');
    let arrowToShow = document.querySelectorAll(".for-arrow");
    for(let i=0; i<arrowToShow.length; i++) {
        arrowToShow[i].addEventListener('click', function(){
            applicationDiv[i].classList.toggle(('display-none'));
        })
    }
}
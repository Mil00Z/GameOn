// DOM Elements
const modalElement = document.querySelector(".bground");
const modalTrigger = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const topNavTrigger = document.getElementById('myTopnav');
const modalCloser = document.querySelectorAll('.closer');


//Get Modal In/Out by click trigger
if (modalTrigger !== null && modalCloser !== null) {

    modalTrigger.forEach((trigger) => {

      // Launch modal event on single Click
      trigger.addEventListener('click',(e)=> {

          setDisplayModal(modalElement,'block');
        
      });

      
    });

    modalCloser.forEach((closer) => {

      closer.addEventListener('click',(e) =>{

    
        setDisplayModal(modalElement,'none');
        switchStateElement(closer);

      });

    });

} else {

  console.warn(`Undefined element on DOM : ${modalBtn} // ${modalCloser}`);
}


// Get some Interactions in Modal
const modalbodyChilds = document.querySelectorAll('.modal-body > *');


modalbodyChilds.forEach((modalChild) => {

  // console.log(modalChild);

  let getClassName = modalChild.getAttribute('class');

  modalChild.dataset.display = getClassName; 

  //Display Childs of the Form Body
  // console.log(modalChild.dataset.display);
});


// Testing Simple click "fake" submiting Form
const formSubmit = document.querySelector('.modal-form');

formSubmit.addEventListener('submit',(e)=> {

  e.preventDefault();

  if (!validateQuantity()) {

    return;

  }
 
  console.log(e);

  getDataInput('.modal-form');
  testSubmit();

  const getValidInputs = document.body.querySelectorAll('.valid');

  // Quick Dumb Condition to check number of input 'valid' with cssClass
  if (getValidInputs.length > 3) {

    // Fade In Sucess
    e.target.closest('.modal-form').classList.toggle('sucess');
  
    document.body.querySelector('.modal-message').classList.toggle('on');

  }

});


//Inputs Names : Testing group of same datas Text
const namesInput = document.querySelectorAll('#first,#last');

namesInput.forEach((input)=>{

  // Inject Warning Message about the Input Field
  let newWarning = document.createElement('div');

  input.addEventListener('change',(e) =>{

    // Get Data Text on Change
    let inputData = input.value;

    // Regex Rules with Testing number inside
    const regexNames = new RegExp("[0-9]");

    // MiniMal Lenght Required
    const minimalNamesLength = 3;

    if(regexNames.test(inputData) || inputData.length < minimalNamesLength || inputData === null) {

        // Display Infos in Log
        displayInputDataLog(input,'wrong');
  
        newWarning.classList.add('debug-input');
        newWarning.textContent = `❌ "${input.value}" is incorrect.
        2 Characters required / no empty string / no numbers`;

        input.closest('.formData').append(newWarning);
    
      } else {

      // Display Infos in Log
      displayInputDataLog(input);
  
      // Display Data On CSS class
      input.classList.add('valid');
      
      // Remove all Debeug Input
      let closestsWarning = document.querySelectorAll('.formData .debug-input');

      for (var warning of closestsWarning) {
          warning.remove();
      }
    
    }
  
  });


});



// Input Email
const emailInput = document.querySelector('#email');

// Inject Warning Message about the Input Field
let newWarning = document.createElement('div');

emailInput.addEventListener('change',(e)=> {

   // Get Data Text on Change
   let inputData = emailInput.value;

    // Standard Regex found on Web
    const regexEmail = new RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}");

    // Minimal Length of Email by my Vision : 1 charac in the start, 1 '@', 1 charac between symbol, 1 '.', 2 charac after '.'
    const minimalEmailLength = 6;

    if(!inputData.match(regexEmail) || inputData.length < minimalEmailLength){

      console.log(regexEmail,inputData,'false');


       // Display Infos in Log
       displayInputDataLog(emailInput,'wrong');

       newWarning.classList.add('debug-input');
       newWarning.textContent = `❌ "${emailInput.value}" is incorrect Email.
      Special Characters missing // Too Short `;
 
      emailInput.closest('.formData').append(newWarning);

    } else {

      // Display Infos in Log
      displayInputDataLog(emailInput);

      // Display Data On CSS class
      emailInput.classList.add('valid');
      
      //Remove all Debeug Input
      let closestsWarning = document.querySelectorAll('.formData .debug-input');
      
      for (var warning of closestsWarning) {
        warning.remove();
      }

    }

});



// Input Quantity Competitions
const quantityInput = document.querySelector('#quantity');

quantityInput.addEventListener('change', validateQuantity);

function validateQuantity(){

  let result = true;

  if (isNaN(quantityInput.value) || quantityInput.value == "") {

    // Display Infos in Log
    displayInputDataLog(quantityInput,'wrong');
    quantityInput.classList.toggle('valid');

    result = false;

  } else {

      displayInputDataLog(quantityInput);
      quantityInput.classList.add('valid');
      
  }

  return result;

}

// Input Birthdate 
const birthdateInput = document.querySelector('#birthdate');

birthdateInput.addEventListener('change',(e) => {

  let birthdateDatas = birthdateInput.valueAsDate;

  birthdateDatasYear = birthdateDatas.getFullYear();
  birthdateDatasMonth = birthdateDatas.getMonth();
  birthdateDatasDay = birthdateDatas.getDay();

  // console.log(isLegal(birthdateDatasYear));


  if (isLegal(birthdateDatasYear)) {

    birthdateInput.classList.add('valid');
    birthdateInput.classList.remove('invalid');

  } else {

    birthdateInput.classList.add('invalid');
    birthdateInput.classList.remove('valid');

  }

});



//Inputs Location Radio
const locationInputs = document.querySelectorAll(`input[name='location']`);

locationInputs.forEach((location) => {

  //Inject Warning Message about the Input Field
  let newWarning = document.createElement('div');

  location.addEventListener('change',(e) => {
    
    if (location.checked) {

      // Display Infos in Log
      displayInputDataLog(location);

      // console.log(location.value,'=> is checked');

      // Display Data On CSS class
      location.classList.add('valid');

    } else {
      // Display Data On CSS class
      newWarning.classList.add('checked');
      
      newWarning.textContent = `❌ "${location.value}" is not correct`;

      location.closest('.formData').append(newWarning);

    }
    
  });


});


// Inputs Checkboxes
const marketingInputs = document.querySelectorAll(`input[type='checkbox']`);
const requiredMarketingInput = 'checkbox1';

marketingInputs.forEach((marketing)=> {

  marketing.addEventListener('change',(e) => {

  
    // Checking if Current is the Required One
    if (marketing.getAttribute('id') === requiredMarketingInput){

        // Checking if Current is Checked
        if (!marketing.checked) {
      
          console.error(`this input is required !`);
          
        } else {
          marketing.classList.add('valid');
        }

    } else {

      console.log(`input checkbox checked but not required`);

    }
 
  });

});













// FUNCTIONS
/**
 * @param {string} navItem
 * @param {string} target
 * @param {string} displayValue
 * @param {object} element
 * @param {string}  wrong
 */

  // Edit Nav
  function editNav(navItem) {
    var x = document.getElementById(`${navitem}`);
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // Modal Display
  function setDisplayModal(target,displayValue){

    target.style.setProperty('display',displayValue);
    
  }

  // Change State Element in Modal 
  function switchStateElement(element){

    element.classList.toggle('on');

    // console.log('switch state function');

  }

  
  function getModalHeight(target){

     let modalFlexHeight = e.target.closest(`${target}`).offsetHeight;

    // console.log(modalFlexHeight);

  }

  
  //Testing if the Birthdate Year is OK with the LAW (just with year, it's not a perfect calculus)
  function isLegal(getDateYear){

    let yearToday = new Date().getFullYear();
    const legalAge = 18;

    if (yearToday - getDateYear < legalAge) {

        console.warn('Ask your parent to doing this buddy :', `${yearToday - getDateYear} years`);

        return false ;

    } else {

      return true;

    }

  
  }
  

  function displayInputDataLog(inputElement,state){

    if  (state == 'wrong') {

      console.warn(`${inputElement.getAttribute('name')} - data input is not correct`);

    } else {

      console.log(`${inputElement.getAttribute('name')} // is a good Input Field Data 💪`);
    }

  }


  function testSubmit() {

    event.preventDefault();

    const box = document.createElement("div");

    box.classList.add('debeug');
    document.querySelector('.content').append(box);


    //Create Date submission
    let timer = new Date();

    //Display submission date on debeug panel
    box.textContent = `Form Submitted at: ${timer.getDate()}/${timer.getUTCMonth()}/${timer.getFullYear()} 
    ${timer.getHours()}h${timer.getMinutes()}`;

    console.log(localStorage);

  }


  function getDataInput(elementTargeted){

    const formTargeted = document.querySelector(`${elementTargeted}`);

    // Create formdata object to store later
    const formData = new FormData(formTargeted);
    console.log('Données directes du Formulaire 👉',formData);

    //Clone the initial object Form Data to another free Object
     let objectDataCopy = Object.fromEntries(formData); 

    const storageFreezeName = 'the-form-count';

    localStorage.setItem(`${storageFreezeName}`, JSON.stringify(objectDataCopy));
  }





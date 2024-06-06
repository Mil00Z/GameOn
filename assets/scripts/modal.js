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

  let getClassName = modalChild.getAttribute('class');

  modalChild.dataset.fonction = getClassName; 

});


// Submitting Form Test
const elementTarget = '.modal-form';
const formSubmit = document.querySelector(`${elementTarget}`);

formSubmit.addEventListener('submit',(e)=> {

  e.preventDefault();

  if (!validateNames(document.querySelector('#first')) | !validateNames(document.querySelector('#last')) | !validateEmail(emailInput) | !validateBirthday(birthdateInput) | !validateQuantity(quantityInput) | !validateLegals(document.querySelector('#checkbox1')) | !validateLocation() ) {

    console.error('Error(s) in Form !');

    return;

  } else {

    // Get Datas
    getDataInput(`${elementTarget}`);
 
     // Fade In Sucess
     e.target.classList.toggle('sucess');
  
     document.body.querySelector('.modal-message').classList.toggle('on');

  }

  
});

  
//Inputs Names : Testing group of same datas Text
const namesInput = document.querySelectorAll('#first,#last');
namesInput.forEach((input)=>{

  input.addEventListener('change', (e)=> {

    validateNames(input);

  });

});



// Input Email
const emailInput = document.querySelector('#email');
emailInput.addEventListener('change',(e)=> {

  validateEmail(e.target);

});



// Input Quantity 
const quantityInput = document.querySelector('#quantity');
quantityInput.addEventListener('change', (e)=> {

  validateQuantity(e.target)

});


// Input Birthdate 
const birthdateInput = document.querySelector('#birthdate');
birthdateInput.addEventListener('change', (e)=> {

  validateBirthday(e.target);

});



//Inputs Location Radio
const locationInputs = document.querySelectorAll(`input[name='location']`);

locationInputs.forEach((location) => {

  location.addEventListener('change',(e) => {

    const inputElement = e.target;

    validateLocation();

  
  });

});


// Inputs Checkboxes
const marketingInputs = document.querySelectorAll(`input[type='checkbox']`);
const requiredMarketingInput = 'checkbox1';

marketingInputs.forEach((marketing)=> {

  marketing.addEventListener('change',(e) => {

    validateLegals(marketing);
 
  });

});

const burgerIcon = document.querySelector('.main-navbar .icon');

burgerIcon.addEventListener('click',(e)=>{

  toggleNav('myTopnav');

});




// FUNCTIONS
/**
 * @param {string} navItem
 * @param {string} target
 * @param {string} displayValue
 * @param {object} element
 * @param {string}  wrong
 */

  // Toggle Nav
  function toggleNav(navItem) {
    
    let iconMenu = document.getElementById(`${navItem}`);
    console.log(iconMenu);

    if (iconMenu.matches('.topnav')) {
      
      iconMenu.classList.toggle('responsive');

    } else {

      iconMenu.className = "topnav";

    }

  }

  // Modal Display
  function setDisplayModal(target,displayValue){

    target.style.setProperty('display',displayValue);
    
  }

  // Change State Element in Modal 
  function switchStateElement(element){

    element.classList.toggle('on');

  }



  //Testing if the Birthdate Year is juste older than 18
  function isLegal(getDateYear){

    let yearToday = new Date().getFullYear();
    const legalAge = 18;

    if (yearToday - getDateYear < legalAge) {

        return false ;

    } else {

      return true;

    }


  }
  
  function displayInputDataLog(inputElement,state){

    if  (state == 'wrong') {

      console.warn(`${inputElement.getAttribute('name')} - data input is not correct`);

    } else {

      // console.log(`${inputElement.getAttribute('name')} // is a good Input Field Data 💪`);
    }

  }


 // Getter/Setter Fonction for FormData
  function getDataInput(elementTargeted){

    const formTargeted = document.querySelector(`${elementTargeted}`);

    // Create formdata object to store later
    const formData = new FormData(formTargeted);
    console.log('Données directes du Formulaire 👉',formData);

    //Clone the initial object Form Data to another free Object
     let objectDataCopy = Object.fromEntries(formData); 

     //Name the Local Storage Object
    const storageFreezeName = 'the-form-count';

    localStorage.setItem(`${storageFreezeName}`, JSON.stringify(objectDataCopy));
  }



  // Logical Fonction testing
  function validateNames(inputElement){

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');

      // Get Data Text on Change
      let inputData = inputElement?.value;
  
      // Regex Rules with Testing number inside
      const regexNames = new RegExp("^[a-zA-Z]+$");
  
      // MiniMal Length Required
      const minimalNamesLength = 2;
  
      if(!regexNames.test(inputData) || inputData.length < minimalNamesLength || inputData === undefined ) {

          // Display Infos in Log
          displayInputDataLog(inputElement,'wrong');
  
          newWarning.classList.add('debug-input');
          newWarning.textContent = `📌 Incorrect Names :
          2 Characters required / no empty string / no numbers`;

          //Checking if a Warning is Already on the closest Scope of Data
          createWarning(inputElement,newWarning);

          return false;
    
        } else {
  
        // Display Infos in Log
        displayInputDataLog(inputElement);
    
        existWarning(inputElement);
       
        return true 
      }
  
      
  }

  function validateEmail(inputElement) {

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');

    // Get Data Text on Change
    let inputData = inputElement?.value;
  
    // Standard Regex found on Web
    const regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
  
    // Minimal Length of Email by my Vision : 1 charac in the start, 1 '@', 1 charac between symbol, 1 '.', 2 charac after '.'
    const minimalEmailLength = 6;
  
    if(!inputData.match(regexEmail) || inputData.length < minimalEmailLength){
  
       // Display Infos in Log
       displayInputDataLog(inputElement,'wrong');
  
       newWarning.classList.add('debug-input');
       newWarning.textContent = `📌 Incorrect Email :
      Special Characters is missing / short entry `;

      
      //Checking if is Warning Already on the closest Scope 
      createWarning(inputElement,newWarning);

      return false;
  
    } else {
  
      // Display Infos in Log
      displayInputDataLog(inputElement);
  
      existWarning(inputElement);

      return true;
  
    }

  }


  function validateQuantity(inputElement) {

    if (isNaN(quantityInput.value) || quantityInput.value === "") {

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');
  
      // Display Infos in Log
      displayInputDataLog(quantityInput,'wrong');
      quantityInput.classList.toggle('valid');

     
      newWarning.classList.add('debug-input');
      newWarning.textContent = `📌 Incorrect Number of participation.`;

      //Checking if is Warning Already on the closest Scope 
      createWarning(inputElement,newWarning);

      return false;
  
    } else {
  
        displayInputDataLog(quantityInput);

        existWarning(inputElement);
  
        return true;
        
    }
  
  }


  function validateBirthday(inputElement) {

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');

  
    let birthdateDatas = birthdateInput?.valueAsDate;

    if (birthdateDatas !== null){

      birthdateDatasYear = birthdateDatas.getFullYear();
      birthdateDatasMonth = birthdateDatas.getMonth();
      birthdateDatasDay = birthdateDatas.getDay();
    
      if (isLegal(birthdateDatasYear)) {
  
        existWarning(inputElement);
  
        return true;
        
      } else {

        // Display Infos in Log
       displayInputDataLog(birthdateInput,'wrong');
  
       newWarning.classList.add('debug-input');
       newWarning.textContent = `📌 Incorrect Date entry : you're too Young.`;

         //Checking if is Warning Already on the closest Scope 
         createWarning(inputElement,newWarning);
  
        return false;
  
      }

    } else {
       // Display Infos in Log
       displayInputDataLog(birthdateInput,'wrong');
  
       newWarning.classList.add('debug-input');
       newWarning.textContent = `📌 Incorrect Date entry.`;


       //Checking if is Warning Already on the closest Scope 
       createWarning(inputElement,newWarning);
  
      return false;
    }
  
  }


  let isValidLocation = false;

  function validateLocation() {

    let result = false ;

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');
   
    locationInputs.forEach((location) => {

      if (location.checked) {

        result = true;
        
      }
    
    });


    const inputElement = locationInputs[0];

    if (result == true ) {

      // Display Infos in Log
      displayInputDataLog(inputElement);

      existWarning(inputElement);

      return true;

    } else {

      newWarning.classList.add('debug-input');
      newWarning.textContent = `📌 Incorrect Location entry : you have to choose one of them`;

      //Checking if is Warning Already on the closest Scope 
      createWarning(inputElement,newWarning);

      return false;

    }

  }

  function validateLegals(inputElement) {


      // Checking if Current is the Required One
      if (inputElement.getAttribute('id') === requiredMarketingInput){

        let newWarning = document.createElement('div');

        // Checking if Current is Checked
        if (!inputElement.checked) {

          newWarning.classList.add('debug-input');
          newWarning.textContent = `📌 Checking 'Utilisation Conditions' is required`;

          createWarning(inputElement,newWarning);
      
          console.warn(`this input as "${inputElement.getAttribute('name')}" is required !`);

          return false;
          
        } else {

          inputElement.parentNode.lastChild.remove();

          return true;
        }

    } else {

      console.log(`this input checkbox checked but not required`);

      return true;

    }


  }


   // Create WarningMessage if is not already in closest scope
   function createWarning(targetInput,warningElement,warningClass='.debug-input',formScope ='.formData') {

    if(!targetInput.parentElement.querySelector(`${warningClass}`)) {

        targetInput.closest(`${formScope}`).append(warningElement);

    }

  }


 // Testing if Warning already in closest scope
  function existWarning(targetInput){

    if(targetInput.parentElement.querySelector(`.debug-input`)) {

      targetInput.parentElement.querySelector(`.debug-input`).remove();

    }

  }


  // Proof of Datas Submission after Submission
  window.addEventListener('load', (e) => {
    
      console.table(localStorage.getItem('the-form-count'));

  });
  





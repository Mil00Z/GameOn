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
const elementTarget = '.modal-form';
const formSubmit = document.querySelector(`${elementTarget}`);

formSubmit.addEventListener('submit',(e)=> {

  e.preventDefault();

  if (!validateNames(document.querySelector('#first')) | !validateNames(document.querySelector('#last')) | !validateEmail(emailInput) | !validateBirthday(birthdateInput) | !validateQuantity(quantityInput) | !validateLegals(document.querySelector('#checkbox1')) ) {

    console.error('Error(s) in Form !');

    return;

  } else {
    
    testSubmit();

    //  // Fade In Sucess
    //  formSubmit.classList.toggle('sucess');
  
    //  document.body.querySelector('.modal-message').classList.toggle('on');

  }

  // Get Datas in Anyway  
  getDataInput(`${elementTarget}`);
 

  // Quick Dumb Condition to check number of input 'valid' with cssClass
  const getValidInputs = document.body.querySelectorAll('.valid');
  
  if (getValidInputs.length < 7) {

      throw new Error('Erreure de validation de formulaire');
    
  } else {

     // Fade In Sucess
     formSubmit.classList.toggle('sucess');
  
     document.body.querySelector('.modal-message').classList.toggle('on');


  }

});


//Inputs Names : Testing group of same datas Text
const namesInput = document.querySelectorAll('#first,#last');

namesInput.forEach((input)=>{

  // Inject Warning Message about the Input Field
  // let newWarning = document.createElement('div');

  input.addEventListener('change', (e)=> {

    validateNames(input);

  });

});



// Input Email
const emailInput = document.querySelector('#email');

// Inject Warning Message about the Input Field
// let newWarning = document.createElement('div');

emailInput.addEventListener('change',(e)=> {

  validateEmail(e.target);

});



// Input Quantity Competitions
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

  //Inject Warning Message about the Input Field
  let newWarning = document.createElement('div');

  location.addEventListener('change',(e) => {
    
    validateLocation(location);
    
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

  editNav('myTopnav');

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

        // console.warn('Ask your parent to doing this buddy :', `${yearToday - getDateYear} years`);

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

  // Logical Fonction testing

  function validateNames(inputElement){

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');

      // Get Data Text on Change
      let inputData = inputElement?.value;
  
      // Regex Rules with Testing number inside
      const regexNames = new RegExp("[0-9]");
  
      // MiniMal Length Required
      const minimalNamesLength = 2;
  
      if(regexNames.test(inputData) || inputData.length < minimalNamesLength || inputData === undefined ) {

          // Display Infos in Log
          displayInputDataLog(inputElement,'wrong');
  
          newWarning.classList.add('debug-input');
          newWarning.textContent = `❌ " ${inputElement.value} " is incorrect.
          2 Characters required / no empty string / no numbers`;
  
          //Check si l'element existe déjà, pas de nouveau message
          if(!inputElement.parentElement.querySelector('.debug-input')) {

            inputElement.closest('.formData').append(newWarning);

          }
          
          return false;
    
        } else {
  
        // Display Infos in Log
        displayInputDataLog(inputElement);
    
        // Display Data On CSS class
        inputElement.classList.add('valid');
        
        // Remove all Debeug Input
        let closestsWarning = document.querySelectorAll('.formData .debug-input');
  
        for (var warner of closestsWarning) {
            warner.remove();
        }
  
        return true 
      }
  
      
  }

  function validateEmail(inputElement) {

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');

    // Get Data Text on Change
    let inputData = inputElement?.value;
  
    // Standard Regex found on Web
    const regexEmail = new RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}");
  
    // Minimal Length of Email by my Vision : 1 charac in the start, 1 '@', 1 charac between symbol, 1 '.', 2 charac after '.'
    const minimalEmailLength = 6;
  
    if(!inputData.match(regexEmail) || inputData.length < minimalEmailLength){
  
       // Display Infos in Log
       displayInputDataLog(inputElement,'wrong');
  
       newWarning.classList.add('debug-input');
       newWarning.textContent = `❌ "${inputElement.value}" is incorrect Email.
      Special Characters is missing // too short entry `;
  
      inputElement.closest('.formData').append(newWarning);

      return false;
  
    } else {
  
      // Display Infos in Log
      displayInputDataLog(inputElement);
  
      // Display Data On CSS class
      inputElement.classList.add('valid');
      
      //Remove all Debeug Input
      let closestsWarning = document.querySelectorAll('.formData .debug-input');
      
      for (var warner of closestsWarning) {
        warner.remove();
      }

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
      newWarning.textContent = `❌ "${inputElement.value}" is incorrect number of participation.`;

    inputElement.closest('.formData').append(newWarning);

  
      return false;
  
    } else {
  
        displayInputDataLog(quantityInput);
        quantityInput.classList.add('valid');
  
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
  
        birthdateInput.classList.add('valid');
        birthdateInput.classList.remove('invalid');
  
        return true;
        
      } else {

        // Display Infos in Log
       displayInputDataLog(birthdateInput,'wrong');
  
       newWarning.classList.add('debug-input');
       newWarning.textContent = `❌ "${inputElement.value}" is incorrect Date entry : you're too Young.`;
  
        inputElement.closest('.formData').append(newWarning);
  
        birthdateInput.classList.add('invalid');
        birthdateInput.classList.remove('valid');
  
        return false;
  
      }

    } else {
       // Display Infos in Log
       displayInputDataLog(birthdateInput,'wrong');
  
       newWarning.classList.add('debug-input');
       newWarning.textContent = `❌ "${inputElement.value}" is incorrect Date entry : you're too Young.`;
  
      inputElement.closest('.formData').append(newWarning);

      return false;
    }
  
  }


  function validateLocation(inputElement) {

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');

    if (inputElement.checked) {

      // Display Infos in Log
      displayInputDataLog(inputElement);

      // console.log(location.value,'=> is checked');

      // Display Data On CSS class
      inputElement.classList.add('valid');

      return true;

    } else {
      // Display Data On CSS class
      newWarning.classList.add('checked');
      
      newWarning.textContent = `❌ "${inputElement.value}" is not correct`;

      inputElement.closest('.formData').append(newWarning);

      return false;

    }

  }

  function validateLegals(inputElement) {


      // Checking if Current is the Required One
      if (inputElement.getAttribute('id') === requiredMarketingInput){

        // Checking if Current is Checked
        if (!inputElement.checked) {
      
          console.error(`this input is required !`);

          return false;
          
        } else {
          inputElement.classList.add('valid');

          return true;
        }

    } else {

      console.log(`input checkbox checked but not required`);

      return true;

    }


  }


  // Proof of Datas Submission after Submission
  window.addEventListener('load', (e) => {
    
      console.table(localStorage.getItem('the-form-count'));

  });





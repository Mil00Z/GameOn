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

  if ( !validateNames() ||  !validateEmail() || !validateBirthday() || !validateQuantity()  || !validateLocation() || !validateLegals()) {

    return;

  } else {
    
    testSubmit();
  
  }

  // Get Datas in Anyway  
  getDataInput(`${elementTarget}`);
 


  // Quick Dumb Condition to check number of input 'valid' with cssClass
  const getValidInputs = document.body.querySelectorAll('.valid');
  // console.log(getValidInputs);
  
  if (getValidInputs.length > 7) {

    // Fade In Sucess
    formSubmit.classList.toggle('sucess');
  
    document.body.querySelector('.modal-message').classList.toggle('on');

  }

});


//Inputs Names : Testing group of same datas Text
const namesInput = document.querySelectorAll('#first,#last');

namesInput.forEach((input)=>{

  // Inject Warning Message about the Input Field
  let newWarning = document.createElement('div');

  input.addEventListener('change', (e)=>{

    validateNames(input,newWarning);

  });

});



// Input Email
const emailInput = document.querySelector('#email');

// Inject Warning Message about the Input Field
let newWarning = document.createElement('div');

emailInput.addEventListener('change',(e)=> {

  validateEmail(emailInput,newWarning);

});



// Input Quantity Competitions
const quantityInput = document.querySelector('#quantity');

quantityInput.addEventListener('change', validateQuantity);


// Input Birthdate 
const birthdateInput = document.querySelector('#birthdate');

birthdateInput.addEventListener('change', ()=> {

  validateBirthday();

});





//Inputs Location Radio
const locationInputs = document.querySelectorAll(`input[name='location']`);

locationInputs.forEach((location) => {

  //Inject Warning Message about the Input Field
  let newWarning = document.createElement('div');

  location.addEventListener('change',(e) => {
    
    validateLocation(location,newWarning);
    
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

  function validateNames(inputElement,inputWarning){

    let result;
  
      // Get Data Text on Change
      let inputData = inputElement?.value;
  
      // Regex Rules with Testing number inside
      const regexNames = new RegExp("[0-9]");
  
      // MiniMal Length Required
      const minimalNamesLength = 3;
  
      if(regexNames.test(inputData) || inputData.length < minimalNamesLength || inputData === undefined ) {
  
          // Display Infos in Log
          displayInputDataLog(inputElement,'wrong');
    
          inputWarning.classList.add('debug-input');
          inputWarning.textContent = `❌ " ${inputElement.value} " is incorrect.
          2 Characters required / no empty string / no numbers`;
  
          inputElement.closest('.formData').append(inputWarning);
  
          result = false;
    
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
  
        result = true 
      }
  
      return result ;
  }

  function validateEmail(inputElement,inputWarning) {

    let result;

    // Get Data Text on Change
    let inputData = inputElement?.value;
  
    // Standard Regex found on Web
    const regexEmail = new RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}");
  
    // Minimal Length of Email by my Vision : 1 charac in the start, 1 '@', 1 charac between symbol, 1 '.', 2 charac after '.'
    const minimalEmailLength = 6;
  
    if(!inputData.match(regexEmail) || inputData.length < minimalEmailLength){
  
       // Display Infos in Log
       displayInputDataLog(inputElement,'wrong');
  
       inputWarning.classList.add('debug-input');
       inputWarning.textContent = `❌ "${inputElement.value}" is incorrect Email.
      Special Characters missing // Too Short `;
  
      inputElement.closest('.formData').append(inputWarning);

      result = false;
  
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

      result = true;
  
    }

    return result;
  
  }

  function validateQuantity(){

    let result;

    if (isNaN(quantityInput.value) || quantityInput.value === "") {
  
      // Display Infos in Log
      displayInputDataLog(quantityInput,'wrong');
      quantityInput.classList.toggle('valid');
  
      result = false;
  
    } else {
  
        displayInputDataLog(quantityInput);
        quantityInput.classList.add('valid');
  
        result = true;
        
    }
  
    return result;
  
  }

  function validateBirthday() {

    let result;

    let birthdateDatas = birthdateInput?.valueAsDate;

    if (birthdateDatas !== null){

      birthdateDatasYear = birthdateDatas.getFullYear();
      // birthdateDatasYear = birthdateDatas?.getFullYear();

      birthdateDatasMonth = birthdateDatas.getMonth();
      // birthdateDatasMonth = birthdateDatas?.getMonth();

      birthdateDatasDay = birthdateDatas.getDay();
      // birthdateDatasDay = birthdateDatas?.getDay();


      if (isLegal(birthdateDatasYear)) {
  
        birthdateInput.classList.add('valid');
        birthdateInput.classList.remove('invalid');
  
        result = true;
        
      } else {
  
        birthdateInput.classList.add('invalid');
        birthdateInput.classList.remove('valid');
  
        result = false;
  
      }

    } else {

      result = false;
    }
  
     return result;
  }


  function validateLocation(inputElement,inputWarning) {

  let result;

    if (inputElement.checked) {

      // Display Infos in Log
      displayInputDataLog(inputElement);

      // console.log(location.value,'=> is checked');

      // Display Data On CSS class
      inputElement.classList.add('valid');

    } else {
      // Display Data On CSS class
      inputWarning.classList.add('checked');
      
      inputWarning.textContent = `❌ "${inputElement.value}" is not correct`;

      inputElement.closest('.formData').append(inputWarning);

    }

  return result;
  }

  function validateLegals(inputElement) {

    let result;

      // Checking if Current is the Required One
      if (inputElement.getAttribute('id') === requiredMarketingInput){

        // Checking if Current is Checked
        if (!inputElement.checked) {
      
          console.error(`this input is required !`);

          result = false;
          
        } else {
          inputElement.classList.add('valid');

          result = true;
        }

    } else {

      console.log(`input checkbox checked but not required`);

      result = true;

    }

    return result;

  }


  // Proof of Datas Submission after Submission
  window.addEventListener('load', (e) => {
    
      console.table(localStorage.getItem('the-form-count'));

  });





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
const formSubmit = document.getElementById('submiter');

formSubmit.addEventListener('click',(e)=> {

  e.preventDefault();
 
  getDataInput('.modal-form');
  testSubmit();

 
  e.target.closest('.modal-form').classList.toggle('sucess');
  
  document.body.querySelector('.modal-message').classList.toggle('on');

});


//Inputs Names : Testing group of same datas Text
const namesInput = document.querySelectorAll('#first,#last');

namesInput.forEach((input)=>{

  input.addEventListener('change',(e) =>{

    //Inject Warning Message about the Input Field
    let newWarning = document.createElement('div');
  

    if(input.value.length < 2 || input.value == ''){

      // Display Infos in Log
      displayInputDataLog(input,'wrong');


      newWarning.classList.add('debug-input');
      newWarning.textContent = `❌ "${input.value}" is too short.
      2 Characters required`;

      input.closest('.formData').append(newWarning);

    
    } else {

      // Display Infos in Log
      displayInputDataLog(input);

      input.classList.add('valid');
      
      let closestWarning = document.querySelector('.formData .debug-input');
      closestWarning.remove();

    }

  });


});


// Input Quantity Competitions
const quantityInput = document.querySelector('#quantity');

quantityInput.addEventListener('change',(e) => {

  if (isNaN(quantityInput.value) || quantityInput.value == "") {

    // Display Infos in Log
    displayInputDataLog(quantityInput,'wrong');
    quantityInput.classList.toggle('valid');

  } else {

      displayInputDataLog(quantityInput);
      quantityInput.classList.add('valid');
      
  }

});

// Input Birthdate 
const birthdateInput = document.querySelector('#birthdate');

birthdateInput.addEventListener('change',(e) => {


  let birthdateDatas = birthdateInput.valueAsDate;

  birthdateDatasYear = birthdateDatas.getFullYear();
  birthdateDatasMonth = birthdateDatas.getMonth();
  birthdateDatasDay = birthdateDatas.getDay();

  // console.log(birthdateDatasMonth,birthdateDatasYear,birthdateDatasDay);

  isLegal(birthdateDatasYear);


});

//Inputs Location Radio
const locationInputs = document.querySelectorAll(`input[name='location']`);

locationInputs.forEach((location) => {

  location.addEventListener('change',(e) => {
    
    if (location.checked) {

      console.log(location.value,'=> is checked');

    } else {

      //Inject Warning Message about the Input Field
      let newWarning = document.createElement('div');

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
          
        } 

    } else {

      console.log(`simple input checkbox available/ not required`);

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

    if (yearToday - getDateYear <= legalAge) {

        console.warn('Ask your parent to doing this buddy :', `${yearToday - getDateYear} years`);

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

    console.log('Données du Form 👉',formData);

    //Clone the initial object Form Data to another free Object
    // let objectDataCopy = Object.assign({},formData);

     let objectDataCopy = {...formData};
  
      // => Impossible de copier l'objet, no log available !
      console.log(objectDataCopy); 
   

    // Get each values of Form Testing Iteration method
    // for (const pairs of formData.entries()){

    // }

  

    //Store Datas in localstorage Area
    // let exportDatas = Array.from(formData);
    let exportDatas = Array.from(formData);

    const storageFreezeName = 'the-form-count';
  
    localStorage.setItem(`${storageFreezeName}`,JSON.stringify(exportDatas));

    // console.log(JSON.parse(localStorage.getItem(`${storageFreezeName}`)));

  }





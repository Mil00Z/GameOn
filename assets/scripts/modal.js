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




// FUNCTIONS
/**
 * @param {string} navItem
 * @param {string} target
 * @param {string} displayValue
 * @param {object} element
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


  function testSubmit() {

    // event.preventDefault();

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


  function getDataInput(formTargeted){

    // Create formdata object to store later
    const formData = new FormData(document.querySelector(`${formTargeted}`));

    console.log('Données du Form 👉',formData);

    // Get each values of Form
    for (const pairs of formData.entries()){
    
      // console.log(pairs);

    }

    //Store Datas in localstorage Area
    let exportDatas = Array.from(formData);
    localStorage.setItem('the-form',JSON.stringify(exportDatas));

    
 
  }





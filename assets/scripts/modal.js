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

        console.log(typeof closer);

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

  console.log(modalChild.dataset.display);
});


// Testing Simple click "fake" submiting Form
const formSubmit = document.getElementById('submiter');

formSubmit.addEventListener('click',(e)=>{

  let modalFlexHeight = e.target.closest('.modal-form').offsetHeight;

  console.log(modalFlexHeight);

  e.target.style.setProperty('--height', '50%');
  e.target.closest('.modal-form').classList.toggle('sucess');
  
  
  document.body.querySelector('.modal-message').classList.toggle('on');

});


// FUNCTIONS
/**
 * @param {string} target
 * @param {string} navItem
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

    console.log('switch state function');

  }




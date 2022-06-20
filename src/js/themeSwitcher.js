


const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');
const section = document.querySelector("#section-switch");
// const footer = document.querySelector("#footer-switch");

const buttonDay = document.querySelector("#button-color-day");
const buttonWeek = document.querySelector("#button-color-week");

// footer.setAttribute("id","footer-switch");

checkbox.addEventListener("change", onSwitchClick);


function onSwitchClick(){
  if (checkbox.checked) 
  {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      

      section.classList.add('dark-on');
      section.classList.remove('light-on');

      buttonDay.classList.add('button-dark');
      buttonDay.classList.remove('button-ligh');

      buttonWeek.classList.add('button-dark');
      buttonWeek.classList.remove('button-ligh');

      // footer.classList.add('dark-on');
      // footerSwitch.classList.remove('light-on');
  
      } 
      
      else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');

        section.classList.add('light-on');
        section.classList.remove('dark-on');

        buttonDay.classList.add('button-ligh');
        buttonDay.classList.remove('button-dark');

        buttonWeek.classList.add('button-ligh');
        buttonWeek.classList.remove('button-dark');

        // footer.classList.add('light-on');
        // footer.classList.remove('dark-on');
  
    }
  }; 

    

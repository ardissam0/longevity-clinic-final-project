// Filename: darkmode.js
// Author: Samuel Ardis
// Date: 11/11/2021
// HTML5 and CSS3 Illustrated, Final Draft

var colorSwitch = document.getElementById("input-color-switch");

if(colorSwitch) {
  initTheme();

  colorSwitch.addEventListener('click', function(event){ 
    checkMode();
  });

  function initTheme() {
    var darkThemeSelected = (localStorage.getItem("colorSwitch") != null && localStorage.getItem("colorSwitch") === "dark");
    
    colorSwitch.checked = darkThemeSelected;

    darkThemeSelected ? document.body.classList.add("dark-mode", "dark") : document.body.classList.remove("dark-mode");
  };

  function checkMode() {
    if(colorSwitch.checked) {
      document.body.classList.add("dark-mode", "dark");
      localStorage.setItem("colorSwitch", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.removeItem("colorSwitch");
    }
  };
}
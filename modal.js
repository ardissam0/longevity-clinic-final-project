// Filename: modal.js
// Author: Samuel Ardis
// Date: 11/11/2021
// HTML5 and CSS3 Illustrated, Final Draft

const btns = document.querySelectorAll("[data-target]");
const close_btns = document.querySelectorAll(".close");
const overlay = document.getElementById("#overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.target).classList.add("active");
        overlay.classList.add("active");
    })
})

close_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.target).classList.remove("active");
        btn.closest(".modal").classList.remove("active");
        overlay.classList.remove("active");
    })
})

window.onclick = (event) => {
    if (event.target == overlay) {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => modal.classList.remove("active"));
      overlay.classList.remove("active");
    }
  };
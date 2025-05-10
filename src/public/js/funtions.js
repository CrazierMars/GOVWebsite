// function toggleMobileNavbar() {
//   document.getElementById("nav-links-container").classList.toggle("active");
// }

const buttons = document.querySelectorAll(".card");
buttons.forEach((button) => {
  // const ruta = button.dataset.ruta;
  button.addEventListener("click", function () {
    window.location.href = "/avisoExpanded";
  // window.location.href = `/perfiles/admin/${ruta}`;
  });
});

//Iniciar sesion
const loginButton = document.getElementById('iniciarSesionButton');
if (loginButton) {
  loginButton.addEventListener("click", function() {
    window.location.href = "login";
  });
}

const loginButton2 = document.getElementById('iniciarSesionButton2');
if (loginButton2) {
  loginButton2.addEventListener("click", function() {
    window.location.href = "login";
  });
}

// //DROPDOWN BUTTON CUANDO YA LA SESION ESTA INCIADA
// const dropdown = document.getElementById('userDropdown');
// const button = dropdown.querySelector('.dropdown-btn');
// const menu = dropdown.querySelector('.dropdown-menu');

// // Toggle menu on button click
// button.addEventListener('click', () => {
//   menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
// });

// // Close menu if click outside
// document.addEventListener('click', (e) => {
//   if (!dropdown.contains(e.target)) {
//     menu.style.display = 'none';
//   }
// });
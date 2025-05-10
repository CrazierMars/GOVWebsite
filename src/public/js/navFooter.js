function toggleMobileNavbar() {
  document.getElementById('nav-links-container').classList.toggle('active');
}
//DROPDOWN BUTTON CUANDO YA LA SESION ESTA INCIADA
const dropdown = document.getElementById('userDropdown');
const button = dropdown.querySelector('.dropdown-btn');
const menu = dropdown.querySelector('.dropdown-menu');

// Toggle menu on button click
button.addEventListener('click', () => {
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

// Close menu if click outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    menu.style.display = 'none';
  }
});
// // Si reutilizas la misma función de menú móvil:
// function toggleMobileNavbar() {
//     const navLinks = document.getElementById('nav-links-container');
//     navLinks.classList.toggle('active');
//   }
  
  // Ejemplo de placeholders a modo de "carga" (opcional):
  // window.addEventListener('DOMContentLoaded', () => {
  //   // Podrías inyectar datos dinámicamente a las tablas
  //   // simulando fetch a tu base de datos, etc.
  //   // Por ahora se deja la tabla con placeholders
  //   console.log('Página de Perfil de Otros Usuarios cargada.');
  // });  

// //Iniciar sesion
// const loginButton = document.getElementById('iniciarSesionButton');
// if (loginButton) {
//   loginButton.addEventListener("click", function() {
//     window.location.href = "/Municipalidad v1.1rev/login.html";
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  // Referencias Usuarios
  const inputNombre = document.getElementById('filtroNombre');
  const selectRol   = document.getElementById('filtroRol');
  const btnReset    = document.getElementById('resetFiltros');
  const rowsU       = document.querySelectorAll('.tabla-usuarios tbody tr');

  if (inputNombre && selectRol && rowsU.length) {
    // Filtrar al teclear
    inputNombre.addEventListener('input', () => {
      const term = inputNombre.value.toLowerCase();
      rowsU.forEach(r => {
        const nombre = r.children[0].textContent.toLowerCase();
        r.style.display = nombre.includes(term) ? '' : 'none';
      });
    });

    // Filtrar al cambiar rol
    selectRol.addEventListener('change', () => {
      const rol = selectRol.value;
      rowsU.forEach(r => {
        const cellRol = r.children[4].textContent.toLowerCase();
        r.style.display = (!rol || cellRol === rol) ? '' : 'none';
      });
    });

    // Limpiar filtros
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        inputNombre.value = '';
        selectRol.value   = '';
        rowsU.forEach(r => r.style.display = '');
      });
    }
  }

  // Denuncias (idéntico patrón, si estás en esa página)
  const inputDesc = document.getElementById('filtroDesc');
  const selectTra = document.getElementById('filtroTramitado');
  const rowsD     = document.querySelectorAll('.tabla-denuncias tbody tr');

  if (inputDesc && selectTra && rowsD.length) {
    inputDesc.addEventListener('input', () => {
      const term = inputDesc.value.toLowerCase();
      rowsD.forEach(r => {
        const desc = r.children[2].textContent.toLowerCase();
        r.style.display = desc.includes(term) ? '' : 'none';
      });
    });

    selectTra.addEventListener('change', () => {
      const val = selectTra.value;
      rowsD.forEach(r => {
        const checked = r.children[3].querySelector('input').checked;
        r.style.display = (!val || String(checked) === val) ? '' : 'none';
      });
    });
  }
});

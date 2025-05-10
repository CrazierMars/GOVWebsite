/* Función para mostrar/ocultar menú móvil */
function toggleMobileNavbar() {
    document.getElementById('nav-links-container').classList.toggle('active');
}

/* Lógica para el carrusel de Accesos Rápidos */
document.addEventListener('DOMContentLoaded', () => {
    const carouselSlide = document.getElementById('carouselSlide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const totalItems = carouselItems.length;

    function updateCarousel() {
        carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Avance automático cada 5 segundos (opcional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
});

/* Otras funciones existentes (por ejemplo, para edición de perfil) */

/**
 * Muestra la ventana emergente de edición (si existe).
 */
function mostrarVentanaEditar() {
    const overlay = document.getElementById('overlayEditarPerfil');
    if (overlay) {
        overlay.classList.add('active');
    }
}

/**
 * Cierra la ventana emergente de edición.
 */
function cerrarVentanaEditar() {
    const overlay = document.getElementById('overlayEditarPerfil');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

/* Validaciones del formulario de edición de perfil (si existe) */
const formularioEditarPerfil = document.getElementById('formEditarPerfilId');
if (formularioEditarPerfil) {
    formularioEditarPerfil.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Validar Nombre
        const nombreVal = document.getElementById('nombreForm').value.trim();
        if (nombreVal.length < 3) {
          alert('El nombre debe tener al menos 3 caracteres.');
          return;
        }
    
        // Validar Apellidos
        const apellidosVal = document.getElementById('apellidosForm').value.trim();
        if (apellidosVal.length < 3) {
          alert('Los apellidos deben tener al menos 3 caracteres.');
          return;
        }
    
        // Validar Cédula (9 a 15 caracteres)
        const cedulaVal = document.getElementById('cedulaForm').value.trim();
        if (cedulaVal.length < 9 || cedulaVal.length > 15) {
          alert('La cédula debe tener entre 9 y 15 caracteres.');
          return;
        }
    
        // Validar Distrito
        const distritoVal = document.getElementById('distritoForm').value;
        const distritosPermitidos = ['Sabanilla', 'Mercedes', 'San Pedro', 'San Rafael'];
        if (!distritosPermitidos.includes(distritoVal)) {
          alert('Distrito no válido.');
          return;
        }
    
        alert('Datos guardados correctamente (simulación).');
        cerrarVentanaEditar();
    });
}

/* Mostrar rol solo si es Administrador o Concejo de Distrito */
window.addEventListener('DOMContentLoaded', () => {
    let userRol = 'Concejo de Distrito';
    // let userRol = 'Administrador';
    // let userRol = 'Usuario';
  
    const rolParrafo = document.getElementById('rolUsuario');
    if (rolParrafo && (userRol === 'Administrador' || userRol === 'Concejo de Distrito')) {
      rolParrafo.textContent = userRol;
      rolParrafo.style.display = 'block';
    }
});

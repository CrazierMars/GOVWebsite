document.addEventListener("DOMContentLoaded", function() {
  // ----- Funciones de Modal -----
  function toggleMobileNavbar() {
    document.getElementById('nav-links-container').classList.toggle('active');
  }
  
  window.toggleMobileNavbar = toggleMobileNavbar; // para acceder desde el HTML

  function mostrarVentanaEditar() {
    const overlay = document.getElementById('overlayEditarPerfil');
    overlay.classList.add('active');
  }
  
  window.mostrarVentanaEditar = mostrarVentanaEditar; // para acceder desde el HTML
  
  function cerrarVentanaEditar() {
    const overlay = document.getElementById('overlayEditarPerfil');
    overlay.classList.remove('active');
  }
  
  window.cerrarVentanaEditar = cerrarVentanaEditar; // para acceder desde el HTML
  
  // ----- Configuración del Formulario -----
  const formularioEditarPerfil = document.getElementById('formEditarPerfilId');
  // Desactivar la validación nativa del navegador
  formularioEditarPerfil.setAttribute('novalidate', true);
  
  const saveButton = document.getElementById('saveButton');
  
  // Campos editables
  const nombreInput    = document.getElementById('nombreForm');
  const apellidosInput = document.getElementById('apellidosForm');
  const cedulaInput    = document.getElementById('cedulaForm');
  const emailInput     = document.getElementById('correoForm');
  const distritoSelect = document.getElementById('distritoForm');
  
  // Elementos para mensajes de error
  const errorNombre    = document.getElementById('errorNombre');
  const errorApellidos = document.getElementById('errorApellidos');
  const errorCedula    = document.getElementById('errorCedula');
  const errorEmail     = document.getElementById('errorEmail');
  const errorDistrito  = document.getElementById('errorDistrito');
  
  // Guarda los valores originales al abrir el formulario
  let originalValues = {
    nombre: nombreInput.value,
    apellidos: apellidosInput.value,
    cedula: cedulaInput.value,
    email: emailInput.value,
    distrito: distritoSelect.value
  };
  
  // Función para habilitar/deshabilitar el botón "Guardar"
  function updateSaveButton() {
    const changesMade = (
      nombreInput.value !== originalValues.nombre ||
      apellidosInput.value !== originalValues.apellidos ||
      cedulaInput.value !== originalValues.cedula ||
      emailInput.value !== originalValues.email ||
      distritoSelect.value !== originalValues.distrito
    );
    
    const hasErrors = (
      errorNombre.textContent.trim() !== '' ||
      errorApellidos.textContent.trim() !== '' ||
      errorCedula.textContent.trim() !== '' ||
      errorEmail.textContent.trim() !== ''

    );
    
    saveButton.disabled = !(changesMade && !hasErrors);
  }
  
  // ----- Validaciones en Tiempo Real -----
  function validateNombre() {
    if (nombreInput.value.trim().length < 3) {
      errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
    } else {
      errorNombre.textContent = '';
    }
    updateSaveButton();
  }
  
  function validateApellidos() {
    if (apellidosInput.value.trim().length < 3) {
      errorApellidos.textContent = 'Los apellidos deben tener al menos 3 caracteres.';
    } else {
      errorApellidos.textContent = '';
    }
    updateSaveButton();
  }
  
  function validateCedula() {
    const value = cedulaInput.value.trim();
    if (value.length < 9 || value.length > 15) {
      errorCedula.textContent = 'La cédula debe tener entre 9 y 15 caracteres.';
    } else {
      errorCedula.textContent = '';
    }
    updateSaveButton();
  }
  
  function validateEmail() {
    const value = emailInput.value.trim();
    // Expresión regular simple para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorEmail.textContent = 'Ingresa un correo válido.';
    } else {
      errorEmail.textContent = '';
    }
    updateSaveButton();
  }
  
  function validateDistrito() {
    const distritosPermitidos = ['Sabanilla', 'Mercedes', 'San Pedro', 'San Rafael'];
    if (!distritosPermitidos.includes(distritoSelect.value)) {
      errorDistrito.textContent = 'Distrito no válido.';
    } else {
      errorDistrito.textContent = '';
    }
    updateSaveButton();
  }
  
  // Asociar eventos "input" o "change" para validación en vivo
  nombreInput.addEventListener('input', validateNombre);
  apellidosInput.addEventListener('input', validateApellidos);
  cedulaInput.addEventListener('input', validateCedula);
  emailInput.addEventListener('input', validateEmail);
  distritoSelect.addEventListener('change', validateDistrito);
  
  // Opcional: también actualizar el botón al perder el foco
  nombreInput.addEventListener('blur', updateSaveButton);
  apellidosInput.addEventListener('blur', updateSaveButton);
  cedulaInput.addEventListener('blur', updateSaveButton);
  emailInput.addEventListener('blur', updateSaveButton);
  distritoSelect.addEventListener('blur', updateSaveButton);
  
  // ----- Evento de envío del formulario -----
  // ----- Evento de envío del formulario -----
formularioEditarPerfil.addEventListener('submit', async function(e) {
  e.preventDefault();

  // 1) Construimos el payload sólo con los campos que cambiaron
  const payload = {};
  if (nombreInput.value    !== originalValues.nombre)      payload.nombre        = nombreInput.value.trim();
  if (apellidosInput.value !== originalValues.apellidos)   payload.apellidos     = apellidosInput.value.trim();
  if (cedulaInput.value    !== originalValues.cedula)      payload.cedula        = cedulaInput.value.trim();
  if (emailInput.value     !== originalValues.email)       payload.email         = emailInput.value.trim();
  if (distritoSelect.value !== originalValues.distrito)    payload.distrito      = distritoSelect.value;
  // si tienes código postal:
  const cpInput = document.getElementById('codigoPostalForm');
  if (cpInput && cpInput.value !== originalValues.codigoPostal) {
    payload.codigoPostal = cpInput.value.trim();
  }

  if (Object.keys(payload).length === 0) {
    return alert('No hubo cambios que guardar.');
  }

  try {
    console.log('→ PUT /api/user payload:', payload);
    const res = await fetch('/api/user', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('← status:', res.status, 'data:', data);

    if (res.ok && data.success) {
      alert('✅ Perfil actualizado correctamente');
      window.location.reload();
    } else {
      alert('⚠️ No se pudo actualizar: ' + (data.message || 'Error desconocido'));
    }
  } catch (err) {
    console.error('Error en fetch:', err);
    alert('❌ Error de red o servidor.');
  }
});

});

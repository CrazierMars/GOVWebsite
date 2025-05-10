function validarTitulo() {
  let titulo = document.getElementById('tituloFormAviso').value.trim();
  let tituloError = document.getElementById("tituloError");
  if (titulo.length < 4) {
    tituloError.style.display = "block";
    return false;
  }else{
    tituloError.style.display = "none";
    return true;
  }
}

function validarContenido() {
  let contenido = document.getElementById('contenidoAviso').value.trim();
  let contenidoError = document.getElementById("contenidoError");
  if (contenido.length < 10) {
    contenidoError.style.display = "block";
    return false;
  }else{
    contenidoError.style.display = "none";
    return true;
  }
}


document.getElementById("tituloFormAviso").addEventListener("input", validarTitulo);
document.getElementById("contenidoAviso").addEventListener("input", validarContenido);


document.getElementById("publicar").addEventListener("click", function(event) {
  event.preventDefault();
  let isValid = true;

  isValid &&= validarTitulo();
  isValid &&= validarContenido();
  isValid &&= validarFormularioExtra(); // Validación de campos vacíos y checkboxes

  if (isValid) {
    alert("Publicación exitosa.");
    document.getElementById("publicarAvisoForm").submit(); // Envia al backend
  }
});

function validarFormularioExtra() {
  const titulo = document.getElementById('tituloFormAviso').value.trim();
  const contenidoDenuncia = document.getElementById('contenidoAviso').value.trim();

  // Campos vacíos
  if (titulo.length === 0 || contenidoDenuncia.length === 0) {
      alert("Todos los campos son obligatorios.");
      return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("contenidoAviso");
  const contador = document.getElementById("contadorAviso");
  const maxCaracteres = textarea.maxLength;

  function actualizarContador() {
      let caracteresUsados = textarea.value.length;
      let caracteresRestantes = maxCaracteres - caracteresUsados;

      // Actualiza el texto del contador
      contador.textContent = caracteresRestantes + " caracteres restantes.";
  }

  // Inicializa el contador al cargar la página
  actualizarContador();

  // Escucha el evento input para actualizar en tiempo real
  textarea.addEventListener("input", actualizarContador);
});

// Mostrar fecha y setear fecha backend
document.addEventListener("DOMContentLoaded", () => {
  const fecha = new Date();
  //frontEnd
  const formatoLegible = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fecha.toLocaleDateString('es-ES', formatoLegible);

  const fechaElemento = document.getElementById("date");
  if (fechaElemento) {
      fechaElemento.textContent = "Fecha actual: " + fechaFormateada;
  }

  //backend yyyy-mm-dd
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  const fechaISO = `${yyyy}-${mm}-${dd}`;

  const inputFecha = document.getElementById("inputFecha");
  if (inputFecha) {
      inputFecha.value = fechaISO;
  }
});

//button Cancelar
function cancelarEnvio() {
  const rutaDefault = "landing.html";
  window.location.href = rutaDefault;
}

// Asociar la función cancelar al evento de clic del botón Cancelar
document.getElementById('cancelar').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe si se hace clic en Cancelar
  cancelarEnvio();    // Llamar a la función cancelarFormulario
});



































// // Función de validación del form
// function validarFormulario() {
//     // Obtener los valores de los campos
//     const titulo = document.getElementById('tituloFormAviso').value.trim();
//     const contenidoAviso = document.getElementById('contenidoAviso').value.trim();
  
//     // Comprobar si alguno de los campos está vacío
//     if (titulo.length === 0 || contenidoAviso.length === 0) {
//       alert("El título y el contenido del aviso son obligatorios.");
//       return false;
//     }else{
//     return true;
//   }
// }
  
//   // Asociar la función de validación al evento de envío del formulario
//   document.getElementById('publicarAvisoForm').addEventListener('submit', function(event) {
//     if (!validarFormulario()) {
//       event.preventDefault(); // Prevenir el envío si la validación falla
//     }
//   });
  


// //contador placeholder contenidoAviso
// document.addEventListener("DOMContentLoaded", function () {
//     const textarea = document.getElementById("contenidoAviso");
//     const contador = document.getElementById("contadorAviso");
//     const maxCaracteres = textarea.maxLength;

//     function actualizarContador() {
//         let caracteresUsados = textarea.value.length;
//         let caracteresRestantes = maxCaracteres - caracteresUsados;

//         // Actualiza el texto del contador
//         contador.textContent = caracteresRestantes + " caracteres restantes.";
//     }

//     // Inicializa el contador al cargar la página
//     actualizarContador();

//     // Escucha el evento input para actualizar en tiempo real
//     textarea.addEventListener("input", actualizarContador);
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const fecha = new Date();
//   //frontEnd
//   const formatoLegible = { year: 'numeric', month: 'long', day: 'numeric' };
//   const fechaFormateada = fecha.toLocaleDateString('es-ES', formatoLegible);

//   const fechaElemento = document.getElementById("date");
//   if (fechaElemento) {
//       fechaElemento.textContent = "Fecha actual: " + fechaFormateada;
//   }

//   //backend yyyy-mm-dd
//   const yyyy = fecha.getFullYear();
//   const mm = String(fecha.getMonth() + 1).padStart(2, '0');
//   const dd = String(fecha.getDate()).padStart(2, '0');
//   const fechaISO = `${yyyy}-${mm}-${dd}`;

//   const inputFecha = document.getElementById("inputFecha");
//   if (inputFecha) {
//       inputFecha.value = fechaISO;
//   }
// });

// //button Cancelar
// function cancelarEnvio() {
//     const rutaDefault = "landing.html";
//     window.location.href = rutaDefault;
//   }
  
//   // Asociar la función cancelar al evento de clic del botón Cancelar
//   document.getElementById('cancelar').addEventListener('click', function(event) {
//     event.preventDefault(); // Evitar que el formulario se envíe si se hace clic en Cancelar
//     cancelarEnvio();    // Llamar a la función cancelarFormulario
//   });

//   //Manejo de imagenes
  
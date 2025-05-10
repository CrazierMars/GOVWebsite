function validarTitulo() {
    let titulo = document.getElementById('tituloFormDenuncia').value.trim();
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
    let contenido = document.getElementById('contenidoFormDenuncia').value.trim();
    let contenidoError = document.getElementById("contenidoError");
    if (contenido.length < 10) {
      contenidoError.style.display = "block";
      return false;
    }else{
      contenidoError.style.display = "none";
      return true;
    }
  }
  
  
  document.getElementById("tituloFormDenuncia").addEventListener("input", validarTitulo);
  document.getElementById("contenidoFormDenuncia").addEventListener("input", validarContenido);
  
  
  document.getElementById("publicar").addEventListener("click", function(event) {
    event.preventDefault();
    let isValid = true;
  
    isValid &&= validarTitulo();
    isValid &&= validarContenido();
    isValid &&= validarFormularioExtra(); // Validación de campos vacíos y checkboxes
  
    if (isValid) {
      alert("Publicación exitosa.");
      document.getElementById("enviarDenunciaForm").submit(); // Envia al backend
    }
  });
  
  function validarFormularioExtra() {
    const titulo = document.getElementById('tituloFormDenuncia').value.trim();
    const contenidoDenuncia = document.getElementById('contenidoFormDenuncia').value.trim();

    // Campos vacíos
    if (titulo.length === 0 || contenidoDenuncia.length === 0) {
        alert("Todos los campos son obligatorios.");
        return false;
    }

    // Checkbox
    if (!getDenunciaAnonima()) {
        alert("Debes seleccionar una opción en los checkboxes.");
        return false;
    }

    return true;
}

// Este bloque se combina con tu botón "publicar"
document.getElementById("publicar").addEventListener("click", function(event) {
    if (!validarFormularioExtra()) {
        event.preventDefault();
        return; // Detiene si falla esta validación extra
    }
});


// Contador de caracteres
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("contenidoFormDenuncia");
    const contador = document.getElementById("contadorDenuncia");
    const maxCaracteres = textarea.maxLength;

    function actualizarContador() {
        let caracteresUsados = textarea.value.length;
        let caracteresRestantes = maxCaracteres - caracteresUsados;
        contador.textContent = caracteresRestantes + " caracteres restantes.";
    }
    actualizarContador();

    textarea.addEventListener("input", actualizarContador);
});


// Fecha formateada
document.addEventListener("DOMContentLoaded", () => {
    const fecha = new Date();
    const formatoLegible = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', formatoLegible);

    const fechaElemento = document.getElementById("date");
    if (fechaElemento) {
        fechaElemento.textContent = "Fecha actual: " + fechaFormateada;
    }

    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    const fechaISO = `${yyyy}-${mm}-${dd}`;

    const inputFecha = document.getElementById("inputFecha");
    if (inputFecha) {
        inputFecha.value = fechaISO;
    }
});


// Botón cancelar
function cancelarEnvio() {
    const rutaDefault = "/";
    window.location.href = rutaDefault;
}

document.getElementById('cancelar').addEventListener('click', function(event) {
    event.preventDefault();
    cancelarEnvio();  
});


// Checkbox helper
function getDenunciaAnonima(){
    const si = document.getElementById("si");
    const no = document.getElementById("no");
    return si?.checked ? "si" : no?.checked ? "no" : null;
}
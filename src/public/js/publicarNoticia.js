function validarTitulo() {
  let titulo = document.getElementById('TituloFormNoticia').value.trim();
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
  let contenido = document.getElementById('contenidoFormNoticia').value.trim();
  let contenidoError = document.getElementById("contenidoError");
  if (contenido.length < 10) {
    contenidoError.style.display = "block";
    return false;
  }else{
    contenidoError.style.display = "none";
    return true;
  }
}

document.getElementById("TituloFormNoticia").addEventListener("input", validarTitulo);
document.getElementById("contenidoFormNoticia").addEventListener("input", validarContenido);


document.getElementById("publicar").addEventListener("click", function(event) {
  event.preventDefault();
  let isValid = true;

  isValid &&= validarFormularioNoticiaComplementario(); // ← validación adicional
  isValid &&= validarTitulo();
  isValid &&= validarContenido();

  if (isValid) {
    alert("Publicación exitosa.");
    document.getElementById("publicarNoticiaForm").submit(); // ← se envía el form real
  }
});

// contador placeholder contenidoNoticia
document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("contenidoFormNoticia");
  const contador = document.getElementById("contadorNoticia");
  const maxCaracteres = textarea.maxLength;

  function actualizarContador() {
    let caracteresUsados = textarea.value.length;
    let caracteresRestantes = maxCaracteres - caracteresUsados;
    contador.textContent = caracteresRestantes + " caracteres restantes.";
  }

  actualizarContador();
  textarea.addEventListener("input", actualizarContador);
});

// mostrar fecha actual y setear input de fecha oculta
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

// función auxiliar extra para mostrar alerta si campos están vacíos
function validarFormularioNoticiaComplementario() {
  const titulo = document.getElementById('TituloFormNoticia').value.trim();
  const contenidoNoticia = document.getElementById('contenidoFormNoticia').value.trim();

  if (titulo.length === 0 || contenidoNoticia.length === 0) {
    alert("El título y el contenido de la noticia son obligatorios.");
    return false;
  }
  return true;
}

// botón cancelar
function cancelarEnvio() {
  window.location.href = '/';
}

document.getElementById('cancelar').addEventListener('click', function(event) {
  event.preventDefault();
  cancelarEnvio();
});

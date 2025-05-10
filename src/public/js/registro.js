function validarNombre() {
  let nombre = document.getElementById("nombre").value.trim();
  let nombreError = document.getElementById("nombreError");
  if (nombre.length >= 3) {
    nombreError.style.display = "none";
    return true;
  } else {
    nombreError.style.display = "block";
    return false;
  }
}

function validarApellido1() {
  let apellido1 = document.getElementById("apellido1").value.trim();
  let apellido1Error = document.getElementById("apellido1Error");
  if (apellido1.length > 3) {
    apellido1Error.style.display = "none";
    return true;
  } else {
    apellido1Error.style.display = "block";
    return false;
  }
}

function validarApellido2() {
  let apellido2 = document.getElementById("apellido2").value.trim();
  let apellido2Error = document.getElementById("apellido2Error");
  if (apellido2.length > 3) {
    apellido2Error.style.display = "none";
    return true;
  } else {
    apellido2Error.style.display = "block";
    return false;
  }
}

function validarCorreoIngresado() {
  let email = document.getElementById("email").value.trim();
  let emailError = document.getElementById("emailError");
  if (validarCorreo(email)) {
    emailError.style.display = "none";
    return true;
  } else {
    emailError.style.display = "block";
    return false;
  }
}

function validarCorreo(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validarCedula() {
  let cedula = document.getElementById("cedula").value.trim();
  let cedulaError = document.getElementById("cedulaError");
  if (cedula.length >= 8 && cedula.length <= 12) {
    cedulaError.style.display = "none";
    return true;
  } else {
    cedulaError.style.display = "block";
    return false;
  }
}

function validarTelefono() {
  let numeroTelefono = document.getElementById("numeroTelefono").value.trim();
  let numeroTelefonoError = document.getElementById("numeroTelefonoError");
  if (numeroTelefono.length == 8) {
    numeroTelefonoError.style.display = "none";
    return true;
  } else {
    numeroTelefonoError.style.display = "block";
    return false;
  }
}

function validarDireccion() {
  let direccion = document.getElementById("direccion").value.trim();
  let direccionError = document.getElementById("direccionError");
  if (direccion.length > 5) {
    direccionError.style.display = "none";
    return true;
  } else {
    direccionError.style.display = "block";
    return false;
  }
}

function validarContrasena1() {
  let password1 = document.getElementById("password1").value.trim();
  let pass1Error = document.getElementById("pass1Error");
  if (password1.length < 6) {
    pass1Error.style.display = "block";
    return false;
  } else {
    pass1Error.style.display = "none";
    return true;
  }
}

function validarContrasena2() {
  let password1 = document.getElementById("password1").value.trim();
  let password2 = document.getElementById("password2").value.trim();
  let pass2Error = document.getElementById("pass2Error");
  if (password1 != password2) {
    pass2Error.style.display = "block";
    return false;
  } else {
    pass2Error.style.display = "none";
    return true;
  }
}



document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("apellido1").addEventListener("input", validarApellido1);
document.getElementById("apellido2").addEventListener("input", validarApellido2);
document.getElementById("email").addEventListener("input", validarCorreoIngresado);
document.getElementById("cedula").addEventListener("input", validarCedula);
document.getElementById("numeroTelefono").addEventListener("input", validarTelefono);
document.getElementById("direccion").addEventListener("input", validarDireccion);
document.getElementById("password1").addEventListener("input", validarContrasena1);
document.getElementById("password2").addEventListener("input", validarContrasena2);



document.getElementById("loginButton").addEventListener("click", function(event) {
  event.preventDefault();
  let isValid = true;

  isValid &&= validarNombre();
  isValid &&= validarApellido1();
  isValid &&= validarApellido2();
  isValid &&= validarCorreoIngresado();
  isValid &&= validarCedula();
  isValid &&= validarTelefono();
  isValid &&= validarDireccion();
  isValid &&= validarContrasena1();
  isValid &&= validarContrasena2();

  if (isValid) {
    alert("Registro exitoso.");
    document.querySelector("form").submit();
  }
});
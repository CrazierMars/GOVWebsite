document.getElementById("boton-continuar").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el botón haga refresh
    let isValid = true;

    // Obtener valores de los inputs
    let password1 = document.getElementById("password1").value.trim();
    let password2 = document.getElementById("password2").value.trim();

    // Mensajes de error
    let userError1 = document.getElementById("passError1");
    let passErrorMatch = document.getElementById("passErrorMatch");


    // Validación de la contraseña (mínimo 6 caracteres)
    if (password1.length < 6) {
        passError1.style.display = "block";
        isValid = false;
    } else {
        passError1.style.display = "none";
    }

    if (password1 != password2) {
      passErrorMatch.style.display = "block";
      isValid = false;
    } else {
      passErrorMatch.style.display = "none";
    }

    // Si todo es válido, mostramos un mensaje
    if (isValid) {
        alert("Cambio de contraseña exitoso.");
    }
});

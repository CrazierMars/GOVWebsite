document.getElementById("iniciarSesionButton").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el botón haga refresh
    let isValid = true;

    // Obtener valores de los inputs
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // Mensajes de error
    let userError = document.getElementById("userError");
    let passError = document.getElementById("passError");

    // Validación del usuario (mínimo 3 caracteres)
    if (username.length < 3) {
        userError.style.display = "block";
        isValid = false;
    } else {
        userError.style.display = "none";
    }

    // Validación de la contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
        passError.style.display = "block";
        isValid = false;
    } else {
        passError.style.display = "none";
    }

    // Si todo es válido, mostramos un mensaje
    if (isValid) {
        alert("Inicio de sesión exitoso.");
    }
});

// //Iniciar sesion
// const loginButton = document.getElementById('iniciarSesionButton');
// if (loginButton) {
//   loginButton.addEventListener("click", function() {
//     window.location.href = "/login";
//   });
// }

document.querySelectorAll(".editarNoticia").forEach((botonEditar) => {
  botonEditar.addEventListener("click", () => {
    const id = botonEditar.id.replace("editarNoticia", "");
    const btnLeerMas = document.getElementById(`leerMas${id}`);
    const botonesEdicion = document.getElementById(`botonesEdicion${id}`);

    const estaActivo = botonesEdicion.classList.contains("activa");

    if (estaActivo) {
      // Ocultar edición
      botonesEdicion.classList.remove("activa");
      btnLeerMas.style.display = "block";
    } else {
      // Mostrar edición
      botonesEdicion.classList.add("activa");
      btnLeerMas.style.display = "none";
    }
  });
});

document.querySelectorAll(".seguirLeyendo").forEach((botonSeguirLeyendo) => {
  botonSeguirLeyendo.addEventListener("click", () => {
    const id = botonSeguirLeyendo.id.replace("seguirLeyendo", "");
    window.location.href = `/noticiaExpanded?id=${id}`;
  });
});

document.querySelectorAll(".copiarB").forEach((botonCopiar) => {
  botonCopiar.addEventListener("click", () => {const id = botonCopiar.id.replace("copiarB", "");
    const url = `${window.location.origin}/noticiaExpanded?id=${id}`;

    navigator.clipboard.writeText(url)
      .then(() => {
        alert("¡Link copiado al portapapeles!");
      })
      .catch(err => {
        console.error("Error al copiar el link: ", err);
      });
  });
});

document.querySelectorAll(".compartirB").forEach((botonCompartir) => {
  botonCompartir.addEventListener("click", () => {
  });
});

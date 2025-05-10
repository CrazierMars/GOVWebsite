//Iniciar sesion

document.querySelectorAll(".tramitarDenuncia").forEach((botonTramitar) => {
  botonTramitar.addEventListener("click", () => {
    const id = botonTramitar.id.replace("tramitarDenuncia", "");
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

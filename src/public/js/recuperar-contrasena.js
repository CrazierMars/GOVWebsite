// document.getElementById("boton-enviar").addEventListener("click", function(event) {
//   // event.preventDefault(); // Evita el envío del formulario
//   let isValid = true;

//   let email = document.getElementById("email");
//   let uemailError = document.getElementById("emailError");

//   if (validarCorreo(email.value)) {
//     emailError.style.display = "none";
//   } else {
//     emailError.style.display = "block";
//     isValid = false;
//   }
// });

// function validarCorreo(email) {
//   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return regex.test(email);
// }


// function enviarCorreo() {
//     fetch('http://localhost:3001/send-email', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         to: 'qh251004@gmail.com',
//         subject: 'Correo de prueba',
//         text: 'Este es un correo enviado desde Nodemailer',
//       }),
//     })
//       .then(res => res.json())
//       .then(data => alert(data.message || data.error))
//       .catch(err => alert('Error al enviar el correo'));
// }

document.getElementById('form-recuperar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('email').value;

  const verificar = await fetch('/verificarUsuarioExiste', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo })
  });

  const res = await verificar.json();

  if (res.existe) {
    enviarCorreo(correo, res.codigo); 
  } else {
    alert('El usuario ' + correo + ' no existe');
  }
});

function enviarCorreo(correo, codigo) {
  fetch('http://localhost:3001/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: correo,
      subject: 'Recuperación de contraseña',
      text: `Tu código de verificación es: ${codigo}`,
      codigoVerificacion: codigo // 
    }),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || data.error);
      // Redirigir 
      window.location.href = '/recuperarContrasenaVerificacion'; // Cambia esta URL por la página que necesites
    })
    .catch(err => alert('Error al enviar el correo'));
}

function generarCodigoTemporal() {
  return rand(100000, 999999); // Genera un número aleatorio de 6 dígitos
}


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC3rpYvrS85RhYnFp8SAMWT3DqIB1MmOiY",
    authDomain: "proyecto1cenfotec-hummingbirds.firebaseapp.com",
    projectId: "proyecto1cenfotec-hummingbirds",
    storageBucket: "proyecto1cenfotec-hummingbirds.firebasestorage.app",
    messagingSenderId: "656695306964",
    appId: "1:656695306964:web:4986b7cc40146cee352941",
    measurementId: "G-JXDZZSJBBY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth=getAuth(app);
  auth.languageCode='en'
  const provider = new GoogleAuthProvider();

  const googleLogin = document.getElementById("g_id_onload");
  googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    const email = result.user.email;
    const photoURL = result.user.photoURL;
    const displayName = result.user.displayName;
    // window.location.href="/" //la idea aca es redirigir a perfil de usuario y autocompletar campos, o bien, loguearse y redirigir a la pagina de inicio
    console.log(user, email, photoURL, displayName)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})
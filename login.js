import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPfs7RCIfgGj2U2YN4XEn1F_jaemg96jk",
    authDomain: "myapp-a2c4a.firebaseapp.com",
    databaseURL: "https://myapp-a2c4a-default-rtdb.firebaseio.com",
    projectId: "myapp-a2c4a",
    storageBucket: "myapp-a2c4a.appspot.com",
    messagingSenderId: "79919463761",
    appId: "1:79919463761:web:e6cb8395d61eaed6aba770"
};

    


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

const loginform = document.querySelector("#Enter");

loginform.addEventListener("submit", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            window.open("Main.html", "_self");  
            sessionStorage.setItem("userid", user.uid);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
})




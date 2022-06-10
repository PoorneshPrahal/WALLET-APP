import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

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

const signinform = document.querySelector("#first");

signinform.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const bank = document.querySelector("#bank").value;
    const number = document.querySelector("#account").value;
    const pin = document.querySelector("#pin").value;
    

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {

            const user = userCredential.user;

            await set(ref(db, 'UserInfo/' + user.uid), {
                Username: username,
                Email: email,
                Bank: bank,
                AccountNumber: number,
                Pin: pin,
                Amount: 0
            })
            alert("You have created your account successfully....");
            window.open("Home.html","_self");
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})






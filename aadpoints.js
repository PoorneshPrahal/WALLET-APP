import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getDatabase, ref, set, child, remove, get, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAPfs7RCIfgGj2U2YN4XEn1F_jaemg96jk",
    authDomain: "myapp-a2c4a.firebaseapp.com",
    databaseURL: "https://myapp-a2c4a-default-rtdb.firebaseio.com",
    projectId: "myapp-a2c4a",
    storageBucket: "myapp-a2c4a.appspot.com",
    messagingSenderId: "79919463761",
    appId: "1:79919463761:web:e6cb8395d61eaed6aba770"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

let userid = sessionStorage.getItem("userid");

const form = document.querySelector("#points");

form.addEventListener("submit", async (e)=>
{
    e.preventDefault();
    const userpin = document.querySelector("#pin").value;
    const pin = parseInt(userpin);
    const amount = parseInt(document.querySelector("#amount").value);

    const dbref = ref(db); 

    await get(child(dbref, "UserInfo/" + userid))
        .then(async (snapshot) => {
            if (snapshot.exists())
            {
                let actualpin = snapshot.val().Pin;
                let availamount = snapshot.val().Amount;
                let actualamount = availamount + amount;
                if (actualpin === pin)
                {
                    await update(ref(db, 'UserInfo/' + userid), {
                        Amount: actualamount
                    })
                    alert("Your amount has been added to your account")
                    window.open("Main.html","_self")
                } 
                else
                {
                    alert("OOPS! Wrong pin number...");
                }
            }
            else
            {
                alert("Data not found!");
            }
        })
        .catch((error) =>
        {
            alert(error);
        })     
})



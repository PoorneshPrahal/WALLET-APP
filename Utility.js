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
const form = document.querySelector("#paybill");

const userid = sessionStorage.getItem("userid");

form.addEventListener("submit", async (e) =>
{
    e.preventDefault();
    const pin = document.querySelector("#pin").value;
    const amount = document.querySelector("#amount").value;
    
    const dbref = ref(db);
    await get(child(dbref, "UserInfo/" + userid))
        .then(async (snapshot) => {
            if (snapshot.exists()) {
                let actualpin = snapshot.val().Pin;
                let availamount = snapshot.val().Amount;
                
                if (actualpin == pin) {
                    if (availamount >= amount) {
                        let actualamount = availamount - amount;
                        await update(ref(db, 'UserInfo/' + userid), {
                            Amount: actualamount
                        })
                        alert(`An amount of ${amount} has been deducted from your account`);
                        window.open("Main.html", "_self")
                    }
                    else {
                        alert("Oops! You are not having enough money to pay your bill...");
                    }                    
                }
                else {
                    alert("OOPS! Wrong pin number...");
                }
            }
            else {
                alert("Data not found!");
            }
        })
        .catch((error) => {
            alert(error);
        })
})


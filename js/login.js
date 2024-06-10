document.addEventListener("DOMContentLoaded", function() {
const message = document.querySelector(".message");

document.querySelector("#signup_mode").addEventListener("click", (event) => {
  event.preventDefault();
  message.textContent = "";
  document.querySelector(".userExist").style.display = "none";
  document.querySelector(".newUser").style.display = "block";
});

document.querySelector("#login_mode").addEventListener("click", (event) => {
  event.preventDefault();
  message.textContent = "";
  document.querySelector(".newUser").style.display = "none";
  document.querySelector(".userExist").style.display = "block";
});

document.querySelector("#signup_button").addEventListener("click", (event) => {
  event.preventDefault();
  let nam = document.querySelector("#myNameOfNewUser").value;
  let pas = document.querySelector("#myPasswrdOfNewUser").value;
  let nec = document.querySelector("#nickname").value;
  let email = document.querySelector("#myEmail").value;

  if (localStorage.getItem(nam)) { 
    message.textContent = "שם משתמש כבר קיים";
  }
  
  if (pas.length < 6) { 
    message.textContent = "סיסמה קצרה מדי";
  }
  
  const arr = ['!', "@", "#", "$", "%", "^", "&", "*"];
  let temp = false;
  let tempEnglish=false;

  for (let i = 0; i < pas.length; i++) {
    if (/^[a-zA-Z]$/.test(pas[i])) { // אם התו הוא אות באנגלית
      tempEnglish = true;
    }
  }
  for (let i = 0; i < pas.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === pas[i]) { 
        temp = true;
        break;
      }
    }
     if (temp) {
       break;
    }
  }
  
  if (temp == false) {
    message.textContent = "אין תו מיוחד בסיסמה";
  }

  if (!tempEnglish) {
    message.textContent = "חובה לכלול לפחות אות אחת באנגלית בסיסמה";
  }

  if (temp  && tempEnglish) {
    if (pas.length >= 6) {
      if (nec && email) {
        if (!localStorage.getItem(nam)) {
          let object = {
            name: nam,
            password: pas,
            nickname: nec,
            emailAdrres: email,
            scor: 0,
          };
          let temp = JSON.stringify(object);
          localStorage.setItem(object.name, temp);
          localStorage.setItem("current", temp);
          window.location.href = "/main.html";
        }
      }
    }
  }
});

document.querySelector("#login_button").addEventListener("click", (event) => {
  event.preventDefault();
  let tempName = document.querySelector("#myName");
  let tempPasswrd = document.querySelector("#myPasswrd");
  let object = JSON.parse(localStorage.getItem(tempName.value));

  if (object.name == tempName.value && object.password == tempPasswrd.value) {
    console.log('1');
    let temp = JSON.stringify(object);
    console.log('2');
    localStorage.setItem("current", temp);
    window.location.href = "/main.html";
  }

  message.textContent = "סיסמה שגויה";
});
});
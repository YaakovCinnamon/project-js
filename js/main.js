
 document.addEventListener("DOMContentLoaded", function() {
    // קבלת פרטי המשתמש מ-localStorage
    const currentUser = JSON.parse(localStorage.getItem("current"));
    if (currentUser && currentUser.name) {
        document.getElementById("username").textContent = currentUser.nickname || currentUser.name;
    } else {
        // אם אין משתמש מחובר, ניתוב לדף ההתחברות
        window.location.href = "/index.html";
    }

    // מעבר למשחק בעת לחיצה על הכפתור
    document.getElementById("start_game").addEventListener("click", function() {
        window.location.href ="/game.html";
    });
});

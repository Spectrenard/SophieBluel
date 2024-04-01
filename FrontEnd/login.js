// Formulaire

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    emailError.style.display = "none";
    passwordError.style.display = "none";

    let isValid = true; // Variable pour suivre l'état de validation

    // Validation de l'e-mail
    if (!isValidEmail(email)) {
      emailError.style.display = "block";
      isValid = false;
    }

    if (password.length < 4) {
      passwordError.style.display = "block";
      isValid = false;
    }

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "sophie.bluel@test.tld",
        password: "S0phie",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la connexion");
        }
        return response.json();
      })
      .then((data) => {
        const token = data.token;
        const userId = data.userId;
        alert("Connexion réussie !");
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        window.location.href = "admin.html";
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        alert("Échec de la connexion !");
      });
  });
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
});

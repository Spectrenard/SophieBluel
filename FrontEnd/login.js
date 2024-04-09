document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.querySelector(".logout");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const emailError = document.getElementById("email-error");
      const passwordError = document.getElementById("password-error");

      emailError.style.display = "none";
      passwordError.style.display = "none";

      let isValid = true;

      // Validation de l'e-mail
      if (!isValidEmail(email)) {
        emailError.style.display = "block";
        isValid = false;
      }

      if (password.length < 4) {
        passwordError.style.display = "block";
        isValid = false;
      }

      if (isValid) {
        // Vérifier si les champs sont valides avant d'envoyer la requête
        fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
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

            // Rediriger vers homepage.html après la connexion réussie
            window.location.href = "index.html";
          })
          .catch((error) => {
            console.error("Erreur lors de la connexion :", error);
            alert("Échec de la connexion !");
          });
      }
    });
  }

  // Déconnexion de l'utilisateur
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (event) {
      event.preventDefault();

      // Supprimer les données de connexion du localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Rediriger vers la page de connexion ou autre
      window.location.href = "index.html";
    });
  }

  // Fonction pour valider l'e-mail
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Exécuter cette partie après le chargement de la page
  const editSpan = document.getElementById("modifier");
  const editionModeDiv = document.querySelector(".edition-mode");
  const loginBtn = document.querySelector(".login");
  const filter = document.querySelector(".filter-part");

  if (editSpan && editionModeDiv) {
    // Vérifier si l'utilisateur est connecté (vous pouvez utiliser localStorage pour cela)
    const userId = localStorage.getItem("userId");

    if (userId) {
      // L'utilisateur est connecté
      editSpan.style.display = "inline";
      editionModeDiv.style.display = "flex";
      logoutBtn.style.display = "flex";
      loginBtn.style.display = "none";
      filter.style.display = "none";
    } else {
      // L'utilisateur n'est pas connecté, masquer les éléments
      editSpan.style.display = "none"; // Masquer le span
      editionModeDiv.style.display = "none"; // Masquer le div
      logoutBtn.style.display = "none";
      loginBtn.style.display = "flex";
    }
  }
});

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    const projects = data;
    const projectsContainer = document.querySelector(".gallery");

    function displayProjects(projectsToShow) {
      projectsContainer.innerHTML = "";

      projectsToShow.forEach((project) => {
        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;

        const title = document.createElement("figcaption");
        title.textContent = project.title;

        const projectContainer = document.createElement("figure");
        projectContainer.appendChild(img);
        projectContainer.appendChild(title);

        projectsContainer.appendChild(projectContainer);
      });
    }

    displayProjects(projects);

    // Filtres
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.textContent.toLowerCase();

        if (category === "tous") {
          displayProjects(projects);
        } else {
          // Catégories
          const filteredProjects = projects.filter(
            (project) => project.category.name.toLowerCase() === category
          );

          displayProjects(filteredProjects);
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching projects:", error);
  });

// Formulaire
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const successPopup = document.querySelector(".success-message");
    const successClose = document.querySelector(".close");

    const name = nameInput.value;
    const email = emailInput.value;
    const text = messageInput.value;

    const emailError = document.getElementById("email-error");
    const nameError = document.getElementById("name-error");
    const textError = document.getElementById("text-error");

    emailError.style.display = "none";
    nameError.style.display = "none";
    textError.style.display = "none";
    successPopup.style.display = "none";

    if (!isValidEmail(email)) {
      emailError.style.display = "block";
    }
    if (name.trim() === "") {
      nameError.style.display = "block";
    }
    if (text.trim() === "") {
      textError.style.display = "block";
    }

    if (isValidEmail(email) && name.trim() !== "" && text.trim() !== "") {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";

      successPopup.style.display = "flex";
      successPopup.classList.add("show");
    }
    successClose.addEventListener("click", () => {
      successPopup.style.display = "none";
    });
  });

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
});

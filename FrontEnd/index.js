// Définition de la fonction displayProjects en haut du script
function displayProjects(projectsToShow) {
  const projectsContainer = document.querySelector(".gallery");
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

// Code principal exécuté après le chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
  let projects = []; // Variable pour stocker tous les projets

  // Fonction pour filtrer et afficher les projets par categoryId
  function filterAndDisplayProjects(categoryId) {
    const filteredProjects = projects.filter(
      (project) => project.categoryId === categoryId
    );
    displayProjects(filteredProjects);
  }

  // Récupérer tous les projets initiaux
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
      }
      return response.json();
    })
    .then((data) => {
      projects = data; // Stocker les projets dans la variable projects
      displayProjects(projects); // Afficher tous les projets initiaux
    });

  // Récupérer les catégories depuis l'API et afficher les boutons de filtre
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      return response.json();
    })
    .then((categories) => {
      // Sélectionner le conteneur des boutons de filtre
      const filterContainer = document.querySelector(".filter-part");

      // Ajouter le bouton "Tous"
      const allButton = document.createElement("button");
      allButton.classList.add("btn");
      allButton.textContent = "Tous";
      allButton.dataset.categoryId = "all";
      allButton.addEventListener("click", () => {
        displayProjects(projects);
      });
      filterContainer.appendChild(allButton);

      // Créer et ajouter les boutons pour chaque catégorie
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = category.name;
        button.dataset.categoryId = category.id; // Stocker l'ID de la catégorie dans l'attribut data

        // Ajouter un écouteur d'événement pour filtrer les projets par catégorie
        button.addEventListener("click", () => {
          const categoryId = parseInt(button.dataset.categoryId);
          filterAndDisplayProjects(categoryId);
        });

        // Ajouter le bouton au conteneur
        filterContainer.appendChild(button);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories :", error);
    });
});

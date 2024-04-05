/// Afficher les projets provenant de l'api
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
        img.setAttribute("data-id", project.id); // Ajoutez l'attribut data-id avec l'identifiant de l'image

        const title = document.createElement("figcaption");
        title.textContent = project.title;

        const projectContainer = document.createElement("figure");
        projectContainer.appendChild(img);
        projectContainer.appendChild(title);
        projectsContainer.appendChild(projectContainer);
      });
    }

    displayProjects(projects);
  });

//******************************************************************//
//******************************************************************//
//*********************** SUPPRIMER UN PROJET ************************//
//******************************************************************//
//******************************************************************/

let token = localStorage.getItem("token");
function deleteProject(workId) {
  console.log("Suppression du projet avec l'ID:", workId);
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }

      if (response.status === 204) {
        console.log("Projet supprimé avec succès");
        // Supprimer l'élément du DOM correspondant au projet supprimé
        deleteProjectFromDOM(workId);
      }
    })
    .catch((error) => console.error("Erreur de suppression:", error));
}

function deleteProjectFromDOM(workId) {
  // Supprimer l'élément du DOM correspondant au projet supprimé de la modale
  const modalProjectElementToDelete = document.querySelector(
    `.modal-body [data-id="${workId}"]`
  );
  if (modalProjectElementToDelete) {
    modalProjectElementToDelete.closest(".image-container").remove();
  }

  // Supprimer l'élément du DOM correspondant au projet supprimé de la galerie
  const galleryProjectElementToDelete = document.querySelector(
    `.gallery [data-id="${workId}"]`
  );
  if (galleryProjectElementToDelete) {
    galleryProjectElementToDelete
      .closest(`.gallery [data-id="${workId}`)
      .remove();
  }
}

//******************************************************************//
//******************************************************************//
// Créer l'icone poubelle pour chaque image dans la modale
//******************************************************************//
//******************************************************************//
document.addEventListener("DOMContentLoaded", function () {
  const modalBody = document.querySelector(".modal-body");

  function createImageWithTrashIcon(item) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    imgContainer.dataset.id = item.id; // Définir l'ID de l'image

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    const deleteIcon = createTrashIcon(); // Appel de la fonction createTrashIcon

    imgContainer.appendChild(img);
    imgContainer.appendChild(deleteIcon);

    return imgContainer;
  }

  // Fonction pour créer l'icône de poubelle
  function createTrashIcon() {
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash", "delete-icon");
    return trashIcon;
  }

  // Fonction pour attacher les icônes de poubelle aux images et gérer les suppressions
  function attachTrashIcons() {
    modalBody.addEventListener("click", (event) => {
      const trashIcon = event.target.closest(".delete-icon");
      if (trashIcon) {
        const imageContainer = trashIcon.closest(".image-container");
        const projectId = imageContainer.dataset.id;

        // Supprimer le projet sans confirmation
        deleteProject(projectId);
      }
    });
  }

  // Fonction pour récupérer les images depuis l'API et les afficher dans la modal
  function fetchAndDisplayImages() {
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const imageContainer = createImageWithTrashIcon(item);
          modalBody.appendChild(imageContainer);
        });
        attachTrashIcons();
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des images:", error)
      );
  }

  fetchAndDisplayImages();
});

//*************************************************** */
// ***********OUVRIR / FERMER LA MODALE**************
//*************************************************** */
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const spanEdit = document.getElementById("modifier");
const overlay = document.querySelector(".overlay");

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});

spanEdit.addEventListener("click", () => {
  modal.style.display = "block";
  overlay.style.display = "block";
});

overlay.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});

//*************************************************** */
// ***********Les réglages de la modale 2**************/
//*************************************************** */
document.addEventListener("DOMContentLoaded", () => {
  const modalClose2 = document.querySelector(".modal-close-2");
  const modal = document.querySelector(".modal");
  const modal2 = document.querySelector(".modal-2");
  const addPhoto = document.getElementById("add-photo");
  const overlay = document.querySelector(".overlay");
  const modalPrecedent = document.querySelector(".modal-precedent");

  modalClose2.addEventListener("click", () => {
    modal.style.display = "none";
    modal2.style.display = "none";
    overlay.style.display = "none";
  });

  addPhoto.addEventListener("click", () => {
    modal2.style.display = "block";
    overlay.style.display = "block";
    modal.style.display = "none";
  });

  modalPrecedent.addEventListener("click", () => {
    modal2.style.display = "none";
    modal.style.display = "block";
  });

  overlay.addEventListener("click", () => {
    modal2.style.display = "none";
    overlay.style.display = "none";
  });
});

//*************************************************************//
// *******************Affichage dynamique**********************
//*************************************************************//

// Prévisualtion de l'image dans la modal 2
//*************************************************************//
document.addEventListener("DOMContentLoaded", function () {
  const imageUploadInput = document.getElementById("image-upload");
  const iconeImage = document.querySelector(".image i");
  const inputP = document.querySelector(".image p");
  const label = document.querySelector(".custom-file-upload");

  imageUploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    // Afficher les propriétés de l'image dans la console
    console.log("Nom du fichier :", file.name);
    console.log("Taille du fichier :", file.size, "octets");
    console.log("Type de fichier :", file.type);
    imageUploadInput.style.display = "none";
    iconeImage.style.display = "none";
    inputP.style.display = "none";
    label.style.display = "none";
    // Afficher l'image sélectionnée
    const imagePreview = document.querySelector(".image img");
    const reader = new FileReader();

    reader.onload = function () {
      imagePreview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
  //**************************************$ */
  // Récuperer les catégories depuis l'API
  //**************************************$ */
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      return response.json();
    })
    .then((data) => {
      // Traitement des données pour les options du select
      const categories = data.map((category) => ({
        id: category.id,
        name: category.name,
      }));

      // Ajout des options au select
      const selectCategory = document.getElementById("category-select");
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        selectCategory.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories :", error);
      // Gérer l'erreur (afficher un message à l'utilisateur, par exemple)
    });

  //******************************************************************//
  //******************************************************************//
  //*********************** AJOUTER UN PROJET ************************//
  //******************************************************************//
  //******************************************************************//
  const addButton = document.getElementById("valider");
  const titleInput = document.getElementById("titre");
  const categorySelect = document.getElementById("category-select");
  const imageInput = document.getElementById("image-upload");

  // Fonction pour vérifier si tous les champs sont remplis
  function checkFields() {
    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const image = imageInput.files[0];

    return title !== "" && category !== "" && image !== undefined;
  }

  // Mettre a jour le style selon les champs remplis ou non
  function updateButtonState() {
    if (checkFields()) {
      addButton.classList.remove("disable");
      addButton.classList.add("enable");
      addButton.disabled = false;
    } else {
      addButton.classList.add("disable");
      addButton.classList.remove("enable");
      addButton.disabled = true;
    }
  }

  //surveiller les changements dans les champs requis
  titleInput.addEventListener("input", updateButtonState);
  categorySelect.addEventListener("change", updateButtonState);
  imageInput.addEventListener("change", updateButtonState);

  updateButtonState();

  // Fonction pour ajouter un projet
  async function addProject(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const categoryId = categorySelect.value;
    const image = imageInput.files[0];
    let token = localStorage.getItem("token");

    if (!checkFields()) {
      alert("Merci de remplir tous les champs");
      return;
    }

    // Créer un objet FormData pour envoyer les données du projet
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", image);

    try {
      // Envoyer les données du projet à l'API via une requête POST
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de l'ajout du projet");
      }

      const data = await response.json();
      alert("Projet ajouté avec succès !");
      // Réinitialiser les champs après l'ajout du projet
      titleInput.value = "";
      categorySelect.value = "";
      imageInput.value = "";
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet:", error);
      alert(
        "Une erreur est survenue lors de l'ajout du projet. Veuillez réessayer."
      );
    }
  }

  // Attacher un écouteur d'événement pour le clic sur le bouton "Valider"
  addButton.addEventListener("click", addProject);
});

//*************************************************************//
//***********************Formulaire contact********************//
//*************************************************************//
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page par défaut

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

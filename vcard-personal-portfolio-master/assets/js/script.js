'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}
//aqui empezamos
// Variables del formulario
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.getElementById("form-status");

// Validar campos del formulario
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Verificar validación del formulario
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Manejar envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Cambiar el estado a "Enviándose..."
  formStatus.textContent = "Enviándose...";
  formStatus.style.color = "blue";
  formBtn.disabled = true; // Deshabilitar botón mientras se envía

  const formData = new FormData(form);

  // Enviar datos al servidor
  fetch("http://localhost:3000/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      message: formData.get("message"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Verifica qué responde el servidor
      if (data.status === "success") {
        formStatus.textContent = "Mensaje enviado correctamente.";
        formStatus.style.color = "green";
      } else {
        formStatus.textContent = "No se pudo enviar el mensaje.";
        formStatus.style.color = "red";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      formStatus.textContent = "Error al enviar el mensaje.";
      formStatus.style.color = "red";
    })
    .finally(() => {
      formBtn.disabled = false; // Habilitar el botón después del envío
    });
});

// aqui estamos


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
  
}
document.addEventListener("DOMContentLoaded", function () {
  // Crear el contenedor del lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox-overlay";
  document.body.appendChild(lightbox);

  // Mostrar la imagen ampliada al hacer clic
  document.querySelectorAll(".lightbox").forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault(); // Evitar la acción por defecto del enlace
      const imgSrc = this.href;
      lightbox.innerHTML = `<img src="${imgSrc}" alt="Ampliado">`;
      lightbox.style.display = "flex";
    });
  });

  // Ocultar el lightbox al hacer clic fuera de la imagen
  lightbox.addEventListener("click", function () {
    lightbox.style.display = "none";
  });
});
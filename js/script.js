$(document).ready(function () {
  //barra de navegação
  let navBtn = $(".nav-link");
  let homeSection = $("#home");
  let aboutSection = $("#about-area");
  let servicesSection = $("#services-area");
  let portfolioSection = $("#portfolio-area");
  let contactSection = $("#contact-area");

  let scrollTo;

  $(navBtn).click(function (event) {
    event.preventDefault();
    let btnId = $(this).attr("id");
    switch (btnId) {
      case "home-menu":
        scrollTo = homeSection;
        break;
      case "about-menu":
        scrollTo = aboutSection;
        break;
      case "services-menu":
        scrollTo = portfolioSection;
        break;
      case "especialidades-menu":
        scrollTo = servicesSection;
        break;
      case "contact-menu":
        scrollTo = contactSection;
        break;
      default:
        scrollTo = homeSection;
    }
    if (scrollTo.length) {
      if (btnId === "home-menu") {
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top - 70,
          },
          900 //velocidade do scroll
        );
      }
      if (btnId === "about-menu") {
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top + 20,
          },
          900
        );
      } else {
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top - 70 + 30,
          },
          900
        );
      }
    }
  });
  //filtro das imgs
  const filterButtons = document.querySelectorAll(
    "#portfolio-area .filter-btn"
  );
  const images = document.querySelectorAll(".project-box");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const category = button.id.replace("-btn", "");
      images.forEach((image) => {
        image.style.display = image.classList.contains(category)
          ? "block"
          : "none";
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const activeButton = document.querySelector("#cortes-btn");
    const images = document.querySelectorAll(".project-box");
    const cortesImages = document.querySelectorAll(".project-box.cortes");

    // Ativa o botão "Cortes"
    if (activeButton) activeButton.classList.add("active");

    // Oculta todas as imagens
    images.forEach((img) => (img.style.display = "none"));

    // Mostra apenas as 3 primeiras imagens de cortes
    cortesImages.forEach((img, index) => {
      if (index < 3) {
        img.style.display = "block";
      }
    });
  });
});

//modal fdp
$(document).ready(function () {
  const modalElement = document.getElementById("imageModal");
  const carouselInner = $("#modalCarousel .carousel-inner");
  const modalLabel = $("#imageModalLabel");
  const images = {
    cortes1: [
      "img/cabelo1ponto1.jpg",
      "img/cabelo1ponto2.jpg",
      "img/cabelo1ponto3.jpg",
    ],
    cortes2: ["img/cabelo2ponto1.jpg", "img/cabelo2ponto2.jpg"],
    cortes3: ["img/cabelo3ponto1.jpg", "img/cabelo3ponto2.jpg"],
    unha1: ["img/unha1.jpg"],
    unha2: ["img/unha2.jpg"],
    unha3: ["img/unha3.jpg"],

    cortes4: ["img/cabelo4ponto1.jpg", "img/cabelo4ponto2.jpg"],
    cortes5: ["img/cabelo5ponto1.jpg", "img/cabelo5ponto2.jpg"],
    cortes6: ["img/cabelo6ponto1.jpg"],
  };
  //casp de erro ao puxar a img
  function loadCarouselImages(group, selectedIndex) {
    carouselInner.empty();
    if (!images[group]) {
      console.error("Grupo de imagens não encontrado:", group);
      return;
    }
    const groupImages = images[group];
    let activeIndex = selectedIndex;
    groupImages.forEach((imgSrc, index) => {
      const imgAlt = imgSrc.split("/").pop();
      const activeClass = index === selectedIndex ? "active" : "";
      carouselInner.append(`
        <div class="carousel-item ${activeClass}">
          <img src="${imgSrc}" class="d-block w-100" alt="${imgAlt}">
        </div>
      `);
    });
    return activeIndex;
  }
  //funcao para saber qual img ta, ex: 1/10, 2/10
  $(".gallery-img").on("click", function () {
    const group = $(this).data("group");
    const clickedIndex = $(this).index();
    const activeIndex = loadCarouselImages(group, clickedIndex);
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const currentIndex = activeIndex + 1;
    const totalImages = carouselInner.children().length;
    modalLabel.text(`${currentIndex}/${totalImages}`);
  });
  $("#modalCarousel").on("slid.bs.carousel", function (event) {
    const currentIndex = $(event.relatedTarget).index() + 1;
    const totalImages = carouselInner.children().length;
    modalLabel.text(`${currentIndex}/${totalImages}`);
  });

  //funcao do zoom + mudar icone
  $(".zoom-btn").click(function () {
    const modalImg = $("#modalCarousel .carousel-item.active img")[0];
    if (modalImg) {
      const isZoomed = modalImg.classList.contains("zoomed");
      if (isZoomed) {
        modalImg.style.transform = "scale(1)";
        modalImg.classList.remove("zoomed");
        $(this)
          .find("i")
          .removeClass("fa-search-minus")
          .addClass("fa-search-plus");
      } else {
        modalImg.style.transform = "scale(1.5)";
        modalImg.classList.add("zoomed");
        $(this)
          .find("i")
          .removeClass("fa-search-plus")
          .addClass("fa-search-minus");
      }
    }
  });
  //mudar item fullscrenn
  window.toggleFullscreen = function () {
    const modal = document.getElementById("imageModal");
    const buttonIcon = document.querySelector(".fullscreen-btn i");

    if (!buttonIcon) {
      console.error("Elemento do ícone não encontrado.");
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        buttonIcon.classList.remove("fa-compress");
        buttonIcon.classList.add("fa-expand");
      });
    } else if (modal.classList.contains("show")) {
      modal.requestFullscreen().then(() => {
        buttonIcon.classList.remove("fa-expand");
        buttonIcon.classList.add("fa-compress");
      });
    }
  };

  // Resetar os ícones sempre que o modal é fechado
  $("#imageModal").on("hidden.bs.modal", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Erro ao sair do modo tela cheia: ${err.message}`);
      });
    }

    $(".zoom-btn i").removeClass("fa-search-minus").addClass("fa-search-plus");
    const buttonIcon = document.querySelector(".fullscreen-btn i");
    if (buttonIcon) {
      buttonIcon.classList.remove("fa-compress");
      buttonIcon.classList.add("fa-expand");
    }
  });
});

//umma serie de gambiarras que nao tem explicacao
const zoomButton = document.querySelector(".zoom-btn");
const carousels = document.getElementById("modalCarousel");
let isZoomed = false;
function toggleZoom() {
  const carouselItem = carousels.querySelector(".carousel-item.active img");
  if (isZoomed) {
    carouselItem.style.transform = "scale(1)";
    carouselItem.style.transition = "transform 0.3s ease";
    isZoomed = false;
    zoomButton.querySelector("i").classList.remove("fa-search-minus");
    zoomButton.querySelector("i").classList.add("fa-search-plus");
  } else {
    carouselItem.style.transform = "scale(1.5)";
    carouselItem.style.transition = "transform 0.3s ease";
    isZoomed = true;
    zoomButton.querySelector("i").classList.remove("fa-search-plus");
    zoomButton.querySelector("i").classList.add("fa-search-minus");
  }
}
carousels.addEventListener("slid.bs.carousel", function () {
  resetZoom();
});

function resetZoom() {
  const carouselItem = carousel.querySelector(".carousel-item.active img");
  carouselItem.style.transform = "scale(1)";
  isZoomed = false;
  zoomButton.querySelector("i").classList.remove("fa-search-minus");
  zoomButton.querySelector("i").classList.add("fa-search-plus");
}

zoomButton.addEventListener("click", toggleZoom);
const carousel = document.querySelector("#modalCarousel");
let startX;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  if (!startX) return;
  let deltaX = e.touches[0].clientX - startX;

  if (deltaX > 50) {
    bootstrap.Carousel.getInstance(carousel).prev();
    startX = null;
  } else if (deltaX < -50) {
    bootstrap.Carousel.getInstance(carousel).next();
    startX = null;
  }
});

//funcao para arrastar a img dentro do modal
const carouselElement = document.querySelector("#modalCarousel");
if (!bootstrap.Carousel.getInstance(carouselElement)) {
  const carousel = new bootstrap.Carousel(carouselElement);
}
if (carouselElement) {
  let startX = null;

  carouselElement.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carouselElement.addEventListener("touchmove", (e) => {
    if (!startX) return;

    const deltaX = e.touches[0].clientX - startX;

    const carouselInstance = bootstrap.Carousel.getInstance(carouselElement);

    if (carouselInstance) {
      if (deltaX > 50) {
        carouselInstance.prev();
      } else if (deltaX < -50) {
        carouselInstance.next();
      }
    }

    startX = null;
  });
}
// Quando o modal abrir, adicionar a classe "modal-active" ao html e body
$("#imageModal").on("show.bs.modal", function () {
  $("html").addClass("modal-active");
  $("body").addClass("modal-active");
});

// Quando o modal for fechado, remover a classe "modal-active"
$("#imageModal").on("hidden.bs.modal", function () {
  $("html").removeClass("modal-active");
  $("body").removeClass("modal-active");
});

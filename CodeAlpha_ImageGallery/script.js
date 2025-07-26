document.addEventListener("DOMContentLoaded", function () {
  const allCards = document.querySelectorAll(".card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.querySelector(".caption");
  const filterButtons = document.querySelectorAll(".filter-button");

  let currentIndex = 0;
  let imageList = Array.from(allCards).filter(card => card.style.display !== 'none');

  function updateImageList() {
    imageList = Array.from(document.querySelectorAll(".card")).filter(card => card.style.display !== "none");
  }

  function updateLightbox(index) {
    const card = imageList[index];
    const img = card.querySelector("img");
    lightboxImg.src = img.src;
    caption.textContent = img.alt || "Image";
  }

  function openLightbox(index) {
    updateImageList();
    lightbox.style.display = "flex";
    currentIndex = index;
    updateLightbox(currentIndex);
  }
  function bindCardClicks() {
    updateImageList();
    imageList.forEach((card, index) => {
      const img = card.querySelector("img");
      img.onclick = (e) => {
        e.stopPropagation();
        openLightbox(index);
      };
    });
  }

  bindCardClicks();

  window.closeLightbox = function () {
    lightbox.style.display = "none";
  };

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    updateImageList();
    currentIndex = (currentIndex + 1) % imageList.length;
    updateLightbox(currentIndex);
  });

  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    updateImageList();
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    updateLightbox(currentIndex);
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") nextBtn?.click();
      if (e.key === "ArrowLeft") prevBtn?.click();
      if (e.key === "Escape") closeLightbox();
    }
  });
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");

      document.querySelector(".filter-button.active")?.classList.remove("active");
      button.classList.add("active");

      allCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      bindCardClicks(); 
    });
  });
});

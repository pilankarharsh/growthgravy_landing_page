document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-header-menu-btn');
  const menuDrawer = document.querySelector('.menu-drawer-container');

  menuBtn.addEventListener('click', () => {
    menuDrawer.classList.toggle('active-menue');
  });

  document.addEventListener('click', (e) => {
    if (!menuDrawer.contains(e.target) && !menuBtn.contains(e.target)) {
      menuDrawer.classList.remove('active-menue');
    }
  });
});
async function fetchTestimonials() {
  try {
    const res = await fetch("data/reviews.json");
    const testimonials = await res.json();
    renderTestimonials(testimonials);
    initializeSwiper(); // Important: init after render
  } catch (error) {
    console.error("Failed to load reviews:", error);
  }
}

function renderTestimonials(testimonials) {
  const container = document.getElementById("testimonialCards");
  container.innerHTML = "";

  testimonials.forEach((t) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="testimonial-card">
        <div class="flag-and-name">
          <img class="user-photo" src="data/users/${t.photo}" alt="${t.name}'s photo" />
        </div>

        <p class="testimonial-text">“${t.text}”</p>

        <div class="card-footer">
          <div class="stars">${"⭐".repeat(t.stars)}</div>
          <div class="card-details">
            <p><b>${t.name}</b> ${t.relation}</p>
          </div>
          <div class="play-button" onclick="openVideo('https://www.youtube.com/embed/6stlCkUDG_s?si=FWdB5EmYTurYOY-7')"><i class="fa fa-play"></i></div>
        </div>
      </div>
    `;

    container.appendChild(slide);
  });
}

function initializeSwiper() {
  new Swiper(".testimonials-swiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    observer: true,
    observerParents: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", fetchTestimonials);


let learningPathData = {};

document.addEventListener("DOMContentLoaded", async () => {
  const gradeButtons = document.querySelectorAll(".learning-path-section .grade-selectors button");
  const timelineContainer = document.querySelector(".timeline-card-container");
  const downloadSubText = document.querySelector(".learning-path-cta .sub-text");

  try {
    const res = await fetch("data/grade-course.json");
    learningPathData = await res.json();

    const defaultGrade = document.querySelector(".learning-path-section .grade-selectors button.active").textContent.trim();
    updateTimeline(defaultGrade);
  } catch (err) {
    console.error("Failed to load learning paths:", err);
  }

  function updateTimeline(grade) {
    const courses = learningPathData[grade] || [];

    timelineContainer.innerHTML = "";

    courses.forEach(course => {
      const card = document.createElement("div");
      card.classList.add("timeline-card");
      card.innerHTML = `
        <img src="${course.img}" alt="${course.title.replace(/<br>/g, ' ')}">
        <span>${course.title}</span>
      `;
      timelineContainer.appendChild(card);
    });

    // Update curriculum download grade
    if (downloadSubText) {
      downloadSubText.textContent = `(${grade})`;
    }
  }

  gradeButtons.forEach(button => {
    button.addEventListener("click", () => {
      gradeButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const selectedGrade = button.textContent.trim();
      updateTimeline(selectedGrade);
    });
  });
});

function openVideo(url) {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeVideo");
    iframe.src = url + "?autoplay=1";
    modal.style.display = "flex";
  }

  function closeVideo() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeVideo");
    iframe.src = "";
    modal.style.display = "none";
  }

  // Optional: close modal on outside click
  window.addEventListener("click", function (e) {
    const modal = document.getElementById("videoModal");
    if (e.target === modal) {
      closeVideo();
    }
  });
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click" , function() {
  nav.classList.toggle("active");
});

const slides = document.getElementById("slides");
const dots =  document.querySelectorAll(".dot");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentSlide = 0;
const totalSlides = dots.length;

function showSlide(index){
    if (index>= totalSlides) {
        currentSlide = 0;
    }
    else if (index <0){
        currentSlide = totalSlides - 1;
    }
    else {
        currentSlide = index;
    }

    slides.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });
    dots[currentSlide].classList.add("active");
}

next.addEventListener("click", function () {
    showSlide(currentSlide + 1);
});

prev.addEventListener("click", function () {
    showSlide(currentSlide - 1);
});

dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
        const index = Number(dot.getAttribute("data-index"));
        showSlide(index);
    });
});
setInterval(function () {
    showSlide(currentSlide + 1);
}, 3000);



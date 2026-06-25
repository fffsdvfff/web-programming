const navBtns = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

const nameInput = document.getElementById("nameInput");
const helloBtn = document.getElementById("helloBtn");
const userText = document.getElementById("userText");

navBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const pageName = btn.dataset.page;

    pages.forEach(function(page) {
      page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");
  });
});

helloBtn.addEventListener("click", function() {
  const name = nameInput.value.trim();

  if (name === "") {
    userText.textContent = "Привіт, гість!";
  } else {
    userText.textContent = "Привіт, " + name + "! 🐾";
  }

  userText.classList.remove("hello-effect");

  setTimeout(function() {
    userText.classList.add("hello-effect");
  }, 10);
});
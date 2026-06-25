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
  const name = nameInput.value;

  if (name == "") {
    userText.textContent = "Привіт, гість!";
  } else {
    userText.textContent = "Привіт, " + name + "! 🐾";
  }

  userText.style.background = "white";
});

let productsList = document.getElementById("productsList");

fetch("data/products.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(products) {
    products.forEach(function(item) {
      productsList.innerHTML += `
        <div class="product-card">
          <div class="product-img">${item.icon}</div>
          <h3>${item.name}</h3>
          <p class="category">${item.category}</p>
          <p>${item.description}</p>
        </div>
      `;
    });
  });
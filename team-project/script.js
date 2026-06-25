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
let searchInput = document.getElementById("searchInput");
let catBtns = document.querySelectorAll(".cat-btn");


let allProducts = [];
let activeCategory = "Усі";

fetch("data/products.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(products) {
    allProducts = products;
    showProducts();
  });

function showProducts() {
  productsList.innerHTML = "";

  let searchText = searchInput.value.toLowerCase();

  allProducts.forEach(function(item) {
    let sameCategory = activeCategory == "Усі" || item.category == activeCategory;
    let sameSearch = item.name.toLowerCase().includes(searchText);

    if (sameCategory && sameSearch) {
      productsList.innerHTML += `
        <div class="product-card">
          <div class="product-img">${item.icon}</div>
          <h3>${item.name}</h3>
          <p class="category">${item.category}</p>
          <p>${item.description}</p>
        </div>
      `;
    }
  });
}

catBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    activeCategory = btn.textContent;
    showProducts();
  });
});

searchInput.addEventListener("input", function() {
  showProducts();
});
let cat = document.getElementById("cat");
let gameArea = document.getElementById("gameArea");

let catLeft = 50;

document.addEventListener("keydown", function(event) {
  if (event.key == "ArrowLeft") {
    catLeft = catLeft - 5;
  }

  if (event.key == "ArrowRight") {
    catLeft = catLeft + 5;
  }

  if (catLeft < 5) {
    catLeft = 5;
  }

  if (catLeft > 95) {
    catLeft = 95;
  }

  cat.style.left = catLeft + "%";
});
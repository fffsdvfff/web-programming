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
let startGameBtn = document.getElementById("startGameBtn");
let scoreText = document.getElementById("score");
let livesText = document.getElementById("lives");

let catLeft = 50;
let score = 0;
let lives = 3;
let gameRun = false;
let createTimer;

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

startGameBtn.addEventListener("click", function() {
  score = 0;
  lives = 3;
  gameRun = true;

  scoreText.textContent = score;
  livesText.textContent = lives;

  startGameBtn.textContent = "Гра йде...";

  clearInterval(createTimer);

  createTimer = setInterval(function() {
    createItem();
  }, 900);
});

function createItem() {
  let item = document.createElement("div");
  item.classList.add("fall-item");

  let randomNumber = Math.floor(Math.random() * 2);

  if (randomNumber == 0) {
    item.textContent = "🐟";
  } else {
    item.textContent = "🪨";
  }

  item.style.left = Math.random() * 90 + "%";

  gameArea.appendChild(item);

  let itemTop = 0;

  let fallTimer = setInterval(function() {
    if (gameRun == false) {
      item.remove();
      clearInterval(fallTimer);
      return;
    }

    itemTop = itemTop + 4;
    item.style.top = itemTop + "px";

    if (isCatch(item, cat)) {
      if (item.textContent == "🐟") {
        score = score + 1;
        scoreText.textContent = score;
      } else {
        lives = lives - 1;
        livesText.textContent = lives;
      }

      item.remove();
      clearInterval(fallTimer);

      if (lives <= 0) {
        endGame();
      }
    }

    if (itemTop > 330) {
      item.remove();
      clearInterval(fallTimer);
    }
  }, 30);
}

function isCatch(item, cat) {
  let itemBox = item.getBoundingClientRect();
  let catBox = cat.getBoundingClientRect();

  return !(
    itemBox.bottom < catBox.top ||
    itemBox.top > catBox.bottom ||
    itemBox.right < catBox.left ||
    itemBox.left > catBox.right
  );
}

function endGame() {
  gameRun = false;
  clearInterval(createTimer);
  startGameBtn.textContent = "Почати знову";
  alert("Гру завершено! Бали: " + score);
}
const navBtns = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

const nameInput = document.getElementById("nameInput");
const helloBtn = document.getElementById("helloBtn");
const userText = document.getElementById("userText");

const productsList = document.getElementById("productsList");
const searchInput = document.getElementById("searchInput");
const catBtns = document.querySelectorAll(".cat-btn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalIcon = document.getElementById("modalIcon");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");

const cat = document.getElementById("cat");
const gameArea = document.getElementById("gameArea");
const startGameBtn = document.getElementById("startGameBtn");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");


let allProducts = [];
let activeCategory = "Усі";

let catLeft = 50;
let score = 0;
let lives = 3;
let gameRun = false;
let createTimer;


navBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const pageName = btn.dataset.page;

    pages.forEach(function(page) {
      page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");
  });
});

helloBtn.addEventListener("click", function () {
  let name = nameInput.value.trim();

  if (name == "") {
    userText.textContent = "Привіт, гість! 🐾";
  } else {
    userText.textContent = "Привіт, " + name + "! 🐾";
  }

  userText.classList.remove("effect");

  setTimeout(function () {
    userText.classList.add("effect");
  }, 50);
});

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
        <div class="product-card" data-name="${item.name}">
          <div class="product-img">
              ${item.image ? `<img src="${item.image}" alt="${item.name}">` : item.icon}
          </div>
          <h3>${item.name}</h3>
          <p class="category">${item.category}</p>
        </div>
      `;
    }
  });
   addCardClicks();
}

function addCardClicks() {
  let cards = document.querySelectorAll(".product-card");

  cards.forEach(function(card) {
    card.addEventListener("click", function() {
      let productName = card.dataset.name;

      allProducts.forEach(function(item) {
        if (item.name == productName) {
         if (item.image) {
           modalIcon.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
          } else {
           modalIcon.textContent = item.icon;
          }
          modalName.textContent = item.name;
          modalCategory.textContent = "Категорія: " + item.category;
          modalDescription.textContent = item.description;
          modal.classList.add("active");
        }
      });
    });
  });
}

closeModal.addEventListener("click", function() {
  modal.classList.remove("active");
});


catBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    activeCategory = btn.textContent;

    catBtns.forEach(function(item) {
      item.classList.remove("active");
    }); 

      btn.classList.add("active");

    showProducts();
  });
});


searchInput.addEventListener("input", function() {
  showProducts();
});

function moveCat(side) {
  if (side == "left") {
    catLeft = catLeft - 5;
  }

  if (side == "right") {
    catLeft = catLeft + 5;
  }

  if (catLeft < 5) {
    catLeft = 5;
  }

  if (catLeft > 95) {
    catLeft = 95;
  }

  cat.style.left = catLeft + "%";
}

document.addEventListener("keydown", function(event) {
  if (event.key == "ArrowLeft") {
    moveCat("left");
  }

  if (event.key == "ArrowRight") {
    moveCat("right");
  }
});

leftBtn.addEventListener("click", function() {
  moveCat("left");
});

rightBtn.addEventListener("click", function() {
  moveCat("right");
});

startGameBtn.addEventListener("click", function() {
  score = 0;
  lives = 3;
  catLeft = 50;
  gameRun = true;

  scoreText.textContent = score;
  livesText.textContent = lives;
   cat.style.left = catLeft + "%";

  startGameBtn.textContent = "Гра йде...";

  clearInterval(createTimer);
  clearItems();

  createTimer = setInterval(function() {
     createItem()
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

const content = document.getElementById("content");

document.getElementById("catalogLink").addEventListener("click", loadCategories);
document.getElementById("homeLink").addEventListener("click", loadHome);
function loadCategories() {
    fetch("data/categories.json")
        .then(res => res.json())
        .then(data => {
            let html = "<h2>Каталог</h2>";

            data.forEach(cat => {
                html += `<p onclick="loadCategory('${cat.shortname}')">${cat.name}</p>`;
            });

            html += `<p onclick="loadRandom()">Specials</p>`;

            content.innerHTML = html;
        });
}

function loadCategory(name) {
    fetch(`data/${name}.json`)
        .then(res => res.json())
        .then(data => {
            let html = `<h2>${data.category}</h2>`;
            html += `<div class="items">`;


            data.items.forEach(item => {
                html += `
                <div class="item">
                    <img src="${item.image}" width="100">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">${item.price}</p>
                </div>
                `;
            });
             html += `</div>`;
            content.innerHTML = html;
        });
}
function loadHome() {
    content.innerHTML = `
    <div class="home">
        <h1>Ласкаво просимо</h1>
    </div>
    `;
}

function loadRandom() {
    fetch("data/categories.json")
        .then(res => res.json())
        .then(data => {
            const random = data[Math.floor(Math.random() * data.length)];
            loadCategory(random.shortname);
        });
}

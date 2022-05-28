const ins = document.getElementsByClassName("cards")[0];

makeCards();

function makeCards() {
    fetch('http://localhost:8000/list')
        .then(res => res.json())
        .then(games => createCards(games))
        .catch(err => console.log(err));
}

function createCards(arr) {
    let crt = 1;
    for (game of arr) {
        let card = document.createElement("a");
        card.classList.add("card");
        card.id = `c${crt}`;
        //this is basically the worst possible way of doing this
        //but it would be a pain(and outside the scope of this project) to do this properly
        if (crt == 1 || crt == 7) {
            card.classList.add("big");
        }
        else if (crt == 3 || crt == 5 || crt == 6 || crt == 9 || crt==11 || crt==13) {
            card.classList.add("long");
        }
        else {
            card.classList.add("small");
        }
        ++crt;
        card.href = `http://localhost:8000/products?id=${game.Id}&title=${game.Title}&price=$${game.Price}`;
        card.innerHTML = `<img src="resources/images/${game.Id}.jpg" alt="${game.Title}">
        <p class="info">${game.Title}</p>
        <p class="price">$${game.Price}</p>`
        ins.appendChild(card);
    }
}
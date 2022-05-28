let ins = document.getElementById("lbtn");
let index = 0;
let id = 0;

makeSlideshow();

function makeSlideshow() {
    fetch('http://localhost:8000/list')
        .then(res => res.json())
        .then(games => {
            createSlides(games);
            index = Math.floor(Math.random() * games.length - 1);
            displaySlide(index);
            id = setInterval(() => displaySlide(++index), 3000);
        })
        .catch(err => console.log(err));
}
function createSlides(arr) {
    for (game of arr) {
        let link = document.createElement("a");
        link.classList.add("slide");
        link.href = `http://localhost:8000/products?id=${game.Id}&title=${game.Title}&price=$${game.Price}`;
        link.innerHTML = `<img src="resources/images/${game.Id}.jpg" alt="${game.Title}">`
        ins.insertAdjacentElement("afterend", link);
    }
}

function displaySlide(n) {

    const slides = document.getElementsByClassName("slide");
    if (n < 0) {
        index = n = slides.length - 1;
    }
    if (n >= slides.length) {
        index = n = 0;
    }
    for (const slide of slides) {
        slide.style.display = "none";
    }
    slides[n].style.display = "flex";

}

function switchSlide(n) {
    index += n;
    clearInterval(id);
    displaySlide(index);
    id = setInterval(() => displaySlide(++index), 3000);
}

//----------------------------------------------------//
document.getElementById("lbtn").addEventListener("click", () => switchSlide(-1));
document.getElementById("rbtn").addEventListener("click", () => switchSlide(1));
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowLeft":
            switchSlide(-1);
            break;
        case "ArrowRight":
            switchSlide(1);
            break;
        default:
            break;
    }
})


document.getElementById("expand").addEventListener("click", () => {
    const search = document.getElementsByClassName("search")[0];
    if (search.classList.length == 1) {
        search.classList.add("big");
    }
    else {
        search.classList.remove("big");
    }
})

function createResults(arr)
{
    let prevs = document.getElementsByClassName('result');
    for(let i=prevs.length-1; i>=0;--i)
        {
            prevs[i].remove();
        }

    let ins = document.getElementById('search-box');
    for (game of arr) {
        let link = document.createElement("a");
        link.classList.add('result');
        link.href = `http://localhost:8000/products?id=${game.Id}&title=${game.Title}&price=$${game.Price}`;
        link.innerHTML = `<img src="resources/images/${game.Id}.jpg" alt="${game.Title}">`
        ins.insertAdjacentElement("afterend", link);
        ins = link;
    }
}

document.getElementById("search_btn").addEventListener("click", () => {
    const radios = document.querySelectorAll('input[name="tags"]');
    const search = document.getElementById('search');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const lucky = document.getElementById('lucky');

    let keyword = search.value;
    let l_bound = min.value;
    let u_bound = max.value;
    let tag = null;

    for (btn of radios)
        if (btn.checked)
            tag = btn.value;

    let rbody = JSON.stringify({ key: keyword, low_p: l_bound, high_p: u_bound, category: tag });

    fetch(`http://localhost:8000/search`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: rbody
        })
        .then(res => res.json())
        .then(data => 
            {
                console.log(data);
                if(lucky.checked)
                {
                    let game = data[0];
                    window.location.replace(`http://localhost:8000/products?id=${game.Id}&title=${game.Title}&price=${game.Price}`)
                }
                else createResults(data);
            })
        .catch(err => console.log(err));

})
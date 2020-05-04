// WORK IN PROGRESS

const titles = [{
        id: 1,
        name: "The Half of it",
        year: 2020,
        mpaa: "PG-13",
        duration: "1h 45m",
        popularity: 9,
        synopsis: "When smart but cash-strapped teen Ellie Chu agrees to write a love letter for a jock, she doesn't expect to become his friend — or fall for his crush.",
        cast: "Leah Lewis, Daniel Diemer",
        director: "Alice Wu",
        genres: "LGBTQ Movies, Teen Movies",
        status: "New",
        poster: "the-half-of-it_poster.jpg",
        background: "the-half-of-it_bg.jpg",
        logo: "./img/the-half-of-it-logo.png"
    },
    {
        id: 2,
        name: "Scary Movie",
        year: 2010,
        mpaa: "R",
        duration: "1h 20m",
        popularity: 1,
        synopsis: "Movie number 2",
        cast: "Leah Lewis, Daniel Diemer",
        director: "Alice Wu",
        genres: "LGBTQ Movies, Teen Movies",
        status: "New",
        poster: "the-half-of-it_poster.jpg",
        background: "the-half-of-it_bg.jpg",
        logo: "https://res.cloudinary.com/dkwgkbgqq/image/upload/v1588519157/assets/the-half-of-it-logo.webp"
    }
];

const list = [];

const myList = document.querySelector("#my-list");
const addToList = document.querySelector("#btn-add");

// DOM titleInfo to save to list array
const titleLogo = document.querySelector(".title-logo-img");
const titleName = titleLogo.title;
const titleBg = document.querySelector(".screen-container");
const titleStatus = document.querySelector(".status");
const titleYear = document.querySelector(".year");
const titleMpaa = document.querySelector(".mpaa");
const titleDuration = document.querySelector(".duration");
const titlePopularity = document.querySelector(".popularity-number");
const titleSynopsis = document.querySelector(".synopsis");
const titleCast = document.querySelector(".cast");
const titleDirector = document.querySelector(".director");
const titleGenres = document.querySelector(".genres");

// events
myList.addEventListener("click", displayList);

// FUNCTIONS
// set movie info on load
(function () {

    // get a random movie from the titles object and update the DOM
    const randIndex = Math.floor(Math.random() * Math.floor(titles.length));
    const currentTitleObject = titles[randIndex];
    // end set random movie to DOM

    // current title
    const title = currentTitleObject;

    // title logo
    titleLogo.src = title.logo;
    titleLogo.title = title.name;
    titleLogo.alt = title.name;

    // title meta
    titleStatus.innerText = title.status;
    titleYear.innerText = title.year;
    titleMpaa.innerText = title.mpaa;
    titleDuration.innerText = title.duration;

    // title popularity
    titlePopularity.innerText = title.popularity;

    // title synopsis
    titleSynopsis.innerText = title.synopsis;
    titleCast.innerText = title.cast;
    titleDirector.innerText = title.director
    titleGenres.innerText = title.genres;

    addToList.addEventListener("click", function (e) {
        addTitle(title);
    });

})();

function addTitle(title) {
    // check if the current title is arealdy in the list
    if (list.some(function (currentTitle) {
            return currentTitle.id === title.id
        })) {
        console.log(`"${title.name}" is already in your list.`);
    } else {
        list.push(title);
        // add list to local storage
        localStorage.setItem("myList", JSON.stringify(title));
        console.log(`"${title.name}" was added to your list`);
    }
}

function displayList() {
    console.log("MY LIST");

    list.forEach(function (title) {
        console.log("- " + title.name);
    })

}
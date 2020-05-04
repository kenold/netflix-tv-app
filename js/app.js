// WORK IN PROGRESS

const titles = [{
    id: 1,
    name: "The Half of it",
    year: 2020,
    mpaa: "PG-13",
    duration: "1h 45m",
    popularity: 9,
    synopsis: "Lorem...",
    cast: "Leah Lewis, Daniel Diemer",
    director: "Alice Wu",
    genres: "LGBTQ Movies, Teen Movies",
    status: "New",
    poster: "the-half-of-it_poster.jpg",
    background: "the-half-of-it_bg.jpg",
    logo: "https://res.cloudinary.com/dkwgkbgqq/image/upload/v1588519157/assets/the-half-of-it-logo.webp"
}];

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

// get a random movie from the titles object and update the DOM
const randIndex = Math.floor(Math.random() * Math.floor(titles.length));
const currentTitleObject = titles[randIndex];
// end set random movie to DOM

// current title
const title = currentTitleObject;

// events
myList.addEventListener("click", toggleList);
addToList.addEventListener("click", addTitle(titleName));

// FUNCTIONS

// set movie info on load
(function () {
    titleLogo.src = title.logo;
})();

function toggleList() {
    //console.log(list);
}

function addTitle(title) {
    list.push(title);
    //displayList();
}

function displayList() {
    //console.log(list);
}
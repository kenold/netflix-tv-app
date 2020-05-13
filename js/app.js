import * as list from "./list.js";
import {
    titles
} from "./data.js";

const DEVELOPMENT = true;

document.addEventListener('DOMContentLoaded', () => {
    // BUTTONS
    const myListButton = document.querySelector("#my-list");
    const addToListButton = document.querySelector("#btn-add");
    const playButtonText = document.querySelector("#btn-play .icon-text");
    const episodeButton = document.querySelector("#btn-episodes");

    // display "My List" content
    myListButton.addEventListener("click", list.display);
    //playButton.addEventListener("click", updatePlayButton);


    // get DOM elements
    const titleLogo = document.querySelector(".title-logo-img");
    const titleBg = document.querySelector(".screen-container");
    const titleStatus = document.querySelector(".status");
    const titleYear = document.querySelector(".year");
    const titleMpaa = document.querySelector(".mpaa");
    const titleDuration = document.querySelector(".duration");
    const titlePopularity = document.querySelector(".popularity-number");
    const titleSynopsis = document.querySelector(".synopsis");
    const titleCast = document.querySelector(".cast");
    const titleCrew = document.querySelector(".crew");
    // crewHeading: Director or Creator
    const titleCrewHeading = document.querySelector('.crew-info .heading')
    const titleGenres = document.querySelector(".genres");

    // fetch local data if dev mode is true
    // else fetch real API
    if (DEVELOPMENT) {
        renderTitles(titles);
    } else {
        async function fetchData() {
            const resp = await fetch('https://api.npoint.io/cf0f54443dac99ea2286')
            let jsonData = await resp.json();
            jsonData = renderTitles(jsonData.titles);
        }
        fetchData();
    }

    function renderTitles(titles) {
        // get a random index from the titles array
        const randIndex = Math.floor(Math.random() * Math.floor(titles.length));

        // save the chosen title in the title variable
        const title = titles[randIndex];

        // *** SET DOM VALUES ***

        // .screen-container div
        titleBg.style.background = `url(./img/${title.background}) no-repeat right center`;
        titleBg.style.backgroundSize = "cover";

        // logo image
        titleLogo.src = `./img/${title.logo}`;
        titleLogo.alt = title.name;

        // meta
        titleStatus.innerText = title.status;
        titleYear.innerText = title.year;
        titleMpaa.innerText = title.mpaa;

        const duration = (title.type === "Movie") ? title.duration : (title.seasons + " Seasons");
        titleDuration.innerText = duration;

        // popularity
        titlePopularity.innerText = title.popularity;

        // synopsis
        titleSynopsis.innerText = title.synopsis;

        // cast and crew heading
        /*
            if title is a movie, set the crew heading to "Director"
            else set the heading to "Creator"
            add the 's' suffix to each heading if crew is more than 1
        */
        const heading = (title.type === "Movie") ? "Director" : "Creator";
        titleCrewHeading.innerText = `${heading}${title.crew.length > 1 ? "s:" : ":"}`;

        // cast and crew names
        titleCast.innerText = title.cast.join(", ");
        titleCrew.innerText = title.crew.join(", ");

        // genres
        titleGenres.innerText = title.genres;

        // update play button text based on title type
        playButtonText.innerText = (title.type === "Movie") ? "Play" : "Play Season 1: Episode 1";

        //  *** EVENT HANDLERS ***

        // show the 'Episodes and more" button for series only
        if (title.type != "Series") {
            episodeButton.classList.add("hide");
        }

        // onclick, add title to list
        addToListButton.addEventListener("click", function (e) {
            list.add(title);
        });

        // rating buttons
        const rateButtonDown = document.querySelector("#btn-rate-down");
        const rateButtonUp = document.querySelector("#btn-rate-up");

        /*  change 'Add to List' button text
        if current the title is already in the list */
        updateAddButton(title.id);

    } // end renderTitles()


    // *** FUNCTIONS ***
    function updateAddButton(id) {
        const myList = JSON.parse(localStorage.getItem("myList"))
        if (myList.some(function (currentTitle) {
                return currentTitle.id === id
            })) {
            // update button text
            const btnAdd = document.querySelector("#btn-add .icon-text");
            btnAdd.innerText = "Remove from My List";

            // hide the vertical bar from the + icon
            const verticalBar = document.querySelector(".icon-add .bar-v");
            verticalBar.classList.add("hide");
        }
    }
})
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

        // hide episode button
        // title.type === "Movie" ?

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
            if the title is a movie, set the crew heading to "Director"
            else set the heading to "Creator"
            pulralize() add the 's' suffix to each headings
        */
        const heading = (title.type === "Movie") ?
            pluralize("Director", title.crew) :
            pluralize("Creator", title.crew);
        titleCrewHeading.innerText = heading;

        // cast and crew names
        titleCast.innerText = title.cast.join(", ");
        titleCrew.innerText = title.crew.join(", ");

        // genres
        titleGenres.innerText = title.genres;

        // update play button text based on title type
        playButtonText.innerText = (title.type === "Movie") ? "Play" : "Play Season 1: Episode 1";

        //  *** EVENT HANDLERS ***
        addToListButton.addEventListener("click", function (e) {
            list.add(title);
        });

        //  update 'Add to List' button if current title is already in the list
        updateAddButton(title.id);

    } // end renderTitles()


    // *** FUNCTIONS ***
    /*
        pluralize() addS the 's' suffix
        to "Director" and "Creator" headings
        if the peopleArray is > 1
        ex. call: pluralize("Creator", title.crew)
        - title.crew is an array
    */
    function pluralize(peopleHeading, peopleArray) {
        if (peopleArray.length > 1) {
            return peopleHeading + "s: ";
        } else {
            return peopleHeading + ": ";
        }
    }

    // addtolist()

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
document.addEventListener('DOMContentLoaded', () => {
    const myList = document.querySelector("#my-list");
    const addToListButton = document.querySelector("#btn-add");

    // get DOM elements
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
    const titleCrew = document.querySelector(".crew");
    // crewHeading: Director or Creator
    const titleCrewHeading = document.querySelector('.crew-info .heading')
    const titleGenres = document.querySelector(".genres");

    // *** FETCH API ***
    async function fetchData() {
        const resp = await fetch('https://api.npoint.io/cf0f54443dac99ea2286')
        let json = await resp.json();
        json = renderTitles(json.titles);
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

        const duration = title.type === "Movie" ? title.duration : (title.seasons + " Seasons");
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
        const heading = title.type === "Movie" ?
            pluralize("Director", title.crew) :
            pluralize("Creator", title.crew);
        titleCrewHeading.innerText = heading;

        // cast and crew names
        titleCast.innerText = title.cast.join(", ");
        titleCrew.innerText = title.crew.join(", ");

        // genres
        titleGenres.innerText = title.genres;
    } // end renderTitles()
    fetchData();

    //  *** EVENT HANDLERS ***
    addToListButton.addEventListener("click", function (e) {
        addToList(title);
    });

    myList.addEventListener("click", displayList);


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

    function addToList(title) {
        // check if localstorage has data
        let myList;
        if (localStorage.getItem("myList") === null) {
            myList = [];
        } else {
            myList = JSON.parse(localStorage.getItem("myList"))
        }
        // push title object to myList array
        myList.push(title);

        // add list to local storage
        localStorage.setItem("myList", JSON.stringify(myList));
        console.log(`"${title.name}" was added to your list`);
    }

    function displayList() {
        console.log("MY LIST");

        const allTitles = JSON.parse(localStorage.getItem("myList"));
        allTitles.forEach(function (title) {
            console.log("- " + title.name);
        })
    }
})
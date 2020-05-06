// TODO: add ./img in DOM
const titles = [{
        id: 1,
        name: "The Half of it",
        year: 2020,
        type: "Movie",
        mpaa: "PG-13",
        duration: "1h 45m",
        popularity: 9,
        synopsis: "When smart but cash-strapped teen Ellie Chu agrees to write a love letter for a jock, she doesn't expect to become his friend — or fall for his crush.",
        cast: ["Leah Lewis", "Daniel Diemer"],
        crew: ["Alice Wu"],
        genres: "LGBTQ Movies, Teen Movies",
        status: "New",
        poster: "the-half-of-it-poster.jpg",
        background: "the-half-of-it-bg.jpg",
        logo: "./img/the-half-of-it-logo.png"
    },
    {
        id: 2,
        name: "Ozark",
        year: 2017,
        type: "Series",
        seasons: 3,
        mpaa: "TV-MA",
        duration: "1h 20m",
        popularity: 1,
        synopsis: "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",
        cast: ["Jason Bateman", "Laura Linney", "Sofia Hublitz"],
        crew: ["Bill Dubuque", "Mark Williams"],
        genres: "TV Dramas",
        status: "98% Match",
        poster: "ozark-poster.jpg",
        background: "ozark-bg.png",
        logo: "./img/ozark-logo.png"
    }
];

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
// crewHeading Director or Creator
const titleCrewHeading = document.querySelector('.crew-info .heading')
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

    // SET DOM elements
    titleBg.style.background = `url(./img/${title.background}) no-repeat right center`;
    titleBg.style.backgroundSize = "cover";

    // title logo
    titleLogo.src = title.logo;
    titleLogo.title = title.name;
    titleLogo.alt = title.name;

    // title meta
    titleStatus.innerText = title.status;
    titleYear.innerText = title.year;
    titleMpaa.innerText = title.mpaa;

    const duration = title.type === "Movie" ? title.duration : (title.seasons + " Seasons");
    titleDuration.innerText = duration;

    // title popularity
    titlePopularity.innerText = title.popularity;

    // title synopsis
    titleSynopsis.innerText = title.synopsis;
    //titleCast.innerText = title.cast;

    /*
        if the title is a movie, set the crew heading to "Director"
        else set the heading to "Creator"
        ...but call the pluralize function
    */
    const heading = title.type === "Movie" ?
        pluralize("Director", title.crew) :
        pluralize("Creator", title.crew);
    titleCrewHeading.innerText = heading;

    // TODO: combine these 2?
    // loop through each crew
    title.cast.forEach(function (person) {
        titleCast.innerText += person;
    });

    // loop through each crew
    title.crew.forEach(function (person) {
        titleCrew.innerText += person;
    });


    titleGenres.innerText = title.genres;

    addToListButton.addEventListener("click", function (e) {
        // pass the current title object to addToList function
        addToList(title);
    });

    // FUNCTIONS
    /*
        pluralize() add the 's' suffix to the
        "Director" and "Creator" headings if the array lenght is > 1
        ex: pluralize("Creator", title.crew)
        - title.crew is an array
    */
    function pluralize(peopleHeading, people) {
        if (people.length > 1) {
            return peopleHeading + "s: ";
        } else {
            return peopleHeading + ": ";
        }
    }

})();

function addToList(title) {


    // check to localstorage has titles
    let myList;
    if (localStorage.getItem("myList") === null) {
        myList = [];
    } else {
        myList = JSON.parse(localStorage.getItem("myList"))
    }
    // push title to myList array
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
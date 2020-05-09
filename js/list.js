function add(title) {
    let myList;

    // check if there is data in local storage
    if (localStorage.getItem("myList") === null) {
        // if not, set an empty array
        myList = [];
    } else {
        // if there is, pull it out and add to it
        myList = JSON.parse(localStorage.getItem("myList"))
    }

    // check for duplicates
    if (myList.some(function (currentTitle) {
            return currentTitle.id === title.id
        })) {
        console.log(`"${title.name}" is already in your list.`);
    } else {
        myList.push(title);
        localStorage.setItem("myList", JSON.stringify(myList));
        console.log(`"${title.name}" was added to your list`);

        // update button text
        const btnAdd = document.querySelector("#btn-add .icon-text");
        btnAdd.innerText = "Remove from My List";

        // hide the vertical bar from the + icon
        const verticalBar = document.querySelector(".icon-add .bar-v");
        verticalBar.classList.add("hide");
    }
}

function display() {
    console.log("MY LIST");

    const allTitles = JSON.parse(localStorage.getItem("myList"));
    allTitles.forEach(function (title) {
        console.log("- " + title.name);
    })
}

export {
    add,
    display
};
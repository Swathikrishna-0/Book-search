let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchresultsEl = document.getElementById("searchResults")
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let bookcount = selectDisplayCountEl.value;

let formData = {
    count: "10 Books",
}

function createAndAppendSearchResult(result) {
    let {
        title,
        imageLink,
        author
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("country-card", "col-6", "mr-auto", "ml-auto", "d-flex", "flex-column")
    searchresultsEl.appendChild(resultItemEl);

    let imageEl = document.createElement("img");
    imageEl.classList.add("image", "mt-auto", "mb-auto")
    imageEl.src = imageLink;
    resultItemEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.classList.add("author-name")
    authorEl.textContent = author;
    resultItemEl.appendChild(authorEl);
}

function displaySearchResults(searchResults) {
    if (searchResults.length !== 0) {
        searchresultsEl.textContent = "Popular Books"
        for (let result of searchResults) {
            createAndAppendSearchResult(result)
        }
    } else {
        searchresultsEl.textContent = "No reuslts found";
    }
}

function searchBook(event) {
    if (event.key === "Enter") {
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value + "&maxResults=" + selectDisplayCountEl.value;
        let options = {
            method: "GET"
        }
        spinnerEl.classList.remove("d-none");
        searchresultsEl.classList.add("d-none");
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                searchresultsEl.classList.remove("d-none");
                spinnerEl.classList.add("d-none");
                console.log(jsonData)
                let {
                    search_results
                } = jsonData;
                console.log(JSON.stringify(jsonData))
                displaySearchResults(search_results);
            })
    }
}
selectDisplayCountEl.addEventListener("change", function(event) {
    formData.count = event.target.value;
    console.log(formData.count)
});
searchInputEl.addEventListener("keydown", searchBook);
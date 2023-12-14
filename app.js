const accessKey = '9ZxquBwF0m84AqtRRIn-Wd9bAE_rm0onZdRuZ3dEtQ8'

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
	keyword = searchBox.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

	const response = await fetch(url);
	const data = await response.json();

	// to reset search keyword
	if(page === 1){
		searchResult.innerHTML = "";
	}

	const results = data.results;

	results.map(result => {
		const image = document.createElement("img");
		image.src = result.urls.small;
		const imageLink = document.createElement("a");
		imageLink.href = result.links.html;
		imageLink.target = "_blank";

		imageLink.appendChild(image);
		searchResult.appendChild(imageLink);
	})

	// to display the "Show more" btn
	showMoreBtn.style.display = "block"; 
}

// Show results of keyword search
searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	page = 1;
	searchImages();
})

// display 12 additional images with every click 
showMoreBtn.addEventListener("click", () => {
	page++;
	searchImages();
})

// TODO: when pressing enter from keyboard, previous search results are displayed again
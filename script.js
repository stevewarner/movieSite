

// Movie API docs
// https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// Example
// https://api.themoviedb.org/3/search/movie?api_key=3e918b8dd253006cde86759c025d0b23&query=Jack+Reacher


/******* TODO *********/
// it would be cool to populate some moves when the page loads or have some kind of browser feature, 
// in addition we could also suppor the search feature we already implemented.

// Check out this link, it might be a good place to start for this feature
// https://www.themoviedb.org/documentation/api/discover

window.onload = function() {
	
	fillMoviesOnLoad();
	
}

function getJson() {
	// Maybe separate api const and fetch into own function and then call fillMoviesOnLoad and search

	// const api = 'https://api.themoviedb.org/3/search/movie?api_key=3e918b8dd253006cde86759c025d0b23&query=kill+bill'

	// fetch(api).then(function(response) {
 //    let contentType = response.headers.get("content-type");
 //    if(contentType && contentType.includes("application/json")) {
 //      return response.json();
 //    }
 //    throw new TypeError("Oops, we haven't got JSON!");
	// })
	// .then(function(json) { 
	// 	console.log('results are', json)	
	// 	appendMovie(json);
	// })
	// .catch(function(error) { console.log(error); });

}

function fillMoviesOnLoad() {
	console.log('loading...')

	const api = 'https://api.themoviedb.org/3/search/movie?api_key=3e918b8dd253006cde86759c025d0b23&query=kill+bill'

	fetch(api).then(function(response) {
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
	})
	.then(function(json) { 
		console.log('results are', json)	
		appendMovie(json);
	})
	.catch(function(error) { console.log(error); });	
}

// this is our function to capture form submits
function search(e) {
	e.preventDefault();

	const api = 'https://api.themoviedb.org/3/search/movie?api_key=3e918b8dd253006cde86759c025d0b23&query='

	let searchTerm = e.target.children[0].value;

	// Using fetch to get the data
	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	// store in a variable somewhere

	//console.log(api + searchTerm)

	fetch(api + searchTerm).then(function(response) {
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
	})
	.then(function(json) { 
		console.log('results are', json)	
		appendMovie(json);
	})
	.catch(function(error) { console.log(error); });
} 

function appendMovie(data) {

	console.log(document.getElementById("content").hasChildNodes())
	
	//remove old results
	while (document.getElementById("content").hasChildNodes()) {
    document.getElementById("content").removeChild(document.getElementById("content").lastChild);
	}

	data.results.forEach((item, index) => {
		//creates results div and class
		let movieResultDiv = document.createElement("div");
		let movieResultClass = document.createAttribute("class");
		movieResultClass.value = "movie";
		movieResultDiv.setAttributeNode(movieResultClass);

		// creates sub div element for flex styling 
		let movieResultSubDiv = document.createElement("div");
		let movieResultSubDivClass = document.createAttribute("class");
		movieResultSubDivClass.value = "movie-child";
		movieResultSubDiv.setAttributeNode(movieResultSubDivClass);
		movieResultDiv.appendChild(movieResultSubDiv);

		//call helper function
		createElement.poster(movieResultSubDiv, item.poster_path);
		createElement.title(movieResultSubDiv, item.title);

		//append it
		document.getElementById("content").appendChild(movieResultDiv);	
	})
	
}

let createElement = {
	title: (parentNode, title) => {
		let movieResultTitleP = document.createElement("p");
		parentNode.appendChild(movieResultTitleP)
		let node = document.createTextNode(title);
		movieResultTitleP.appendChild(node);
	},
	poster: (parentNode, posterPath) => {
		let fullPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + posterPath;
		// let node = document.createTextNode(poster);
		let movieResultPoster = document.createElement("img");
		let movieResultPosterSrc = document.createAttribute("src");
		movieResultPosterSrc.value = fullPosterPath;
		movieResultPoster.setAttributeNode(movieResultPosterSrc);
		parentNode.appendChild(movieResultPoster);
	}
}


// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById("aboutBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
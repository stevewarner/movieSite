

// Movie API docs
// https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// Example
// https://api.themoviedb.org/3/search/movie?api_key=3e918b8dd253006cde86759c025d0b23&query=Jack+Reacher


/******* TODO *********/
// Refine frontpage results (Currently shows highest rated with more than 999 votes)
// Add more information to results like director, popularity, rating, summary?
// ^Flip animation like this would be cool https://codepen.io/stevewarner/pen/PJzmRQ

// Check out this link, it might be a good place to start for this feature
// https://www.themoviedb.org/documentation/api/discover

(function fillMoviesOnLoad() {
	getResults(null, 'discover')
})();


// this is our function to capture form submits
// param {object} e    - this is the event object
// param {string} type - we're using search and discover
function getResults(e, type) {
	if (e) {e.preventDefault();}

	const key = '3e918b8dd253006cde86759c025d0b23'

	// we'll define the variable here and then we can assign it below
	let apiUrl = ''
	switch (type) {
		case 'search':
			apiUrl = `https://api.themoviedb.org/3/${type}/movie?api_key=${key}&query=`
		case 'discover':
			apiUrl = `https://api.themoviedb.org/3/${type}/movie?api_key=${key}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&vote_count.gte=999&query=`
		break;
		case 'random':
			apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}
				&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=10`
		break;
		default:
			apiUrl = `https://api.themoviedb.org/3/${type}/movie?api_key=${key}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&vote_count.gte=999&query=`
	}

	// only get the value of the search input field if the user submits the search form
	let searchTerm
	if (e && type === 'search') {
		searchTerm = e.target.children[0].value;
	}
		// Using fetch to get the data
		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		console.log(apiUrl)
		let searchUrl = searchTerm ? apiUrl + searchTerm : apiUrl;
		fetch(searchUrl).then(function(response) {
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

function removeChildren() {
	var element = document.getElementById("content");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
}

function appendMovie(data) {
	// before we append each set of movie results remove the previous ones
	removeChildren()
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
		createElement.year(movieResultSubDiv, item.release_date);
		createElement.rating(movieResultSubDiv, item.vote_average);
		console.log(item.vote_average)

		//append it
		document.getElementById("content").appendChild(movieResultDiv);	
	})
	
}

let createElement = {
	title: (parentNode, title) => {
		let movieResultTitleP = document.createElement("h2");
		parentNode.appendChild(movieResultTitleP)
		let node = document.createTextNode(title);
		movieResultTitleP.appendChild(node);
	},
	poster: (parentNode, posterPath) => {
		const placeholderImg = 'images/movie-poster-placeholder.png'
		let fullPosterPath = posterPath ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + posterPath : placeholderImg;
		// let node = document.createTextNode(poster);
		let movieResultPoster = document.createElement("img");
		let movieResultPosterSrc = document.createAttribute("src");
		movieResultPosterSrc.value = fullPosterPath;
		movieResultPoster.setAttributeNode(movieResultPosterSrc);
		parentNode.appendChild(movieResultPoster);
	},
	year: (parentNode, year) => {
		let releaseYear = document.createElement("p");
		parentNode.appendChild(releaseYear)
		let node = document.createTextNode(year.substring(0,4));
		releaseYear.appendChild(node);
	},
	rating: (parentNode, rating) => {
		let averageRating = document.createElement("p");
		parentNode.appendChild(averageRating)
		let node = document.createTextNode(rating +'/10');
		averageRating.appendChild(node);
	},
}

let randomMovie = document.getElementById("randomMovie");

randomMovie.onclick = function() {
	getResults(event, 'random')
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

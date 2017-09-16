var api = 'http://netflixroulette.net/api/api.php?director=Quentin%20Tarantino'

// Movie API docs
// https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// Example
// https://api.themoviedb.org/3/search/movie?api_key=3e918b8dd253006cde86759c025d0b23&query=Jack+Reacher


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("aboutBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
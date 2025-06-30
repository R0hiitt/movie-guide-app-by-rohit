const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const movieinput = document.querySelector('.movie-input');


// function to fetch movie details using omcn API
const getMovieInfo = async(movie) =>{
    try {
    const myAPIkey = "f63905a9";
    const url = `https://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

    const response = await fetch(url);
    const data = await response.json();

    showMovieData(data);
    }
    catch(error) {
        showErrorMessage("No Movie found 🥺");
    }

}

// function to show movie data on screen
const showMovieData = (data) =>{
  movieContainer.innerHTML = "";
  movieContainer.classList.remove('nobackground');
//use Destructing assignment to extract properties from data object
const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

const movieElement = document.createElement('div');
movieElement.classList.add('movie-info');

movieElement.innerHTML = `<h2>${Title}</h2>
                         <p><strong>Rating : &#11088;</strong>${imdbRating}</p>`;

const movieGenreElement = document.createElement('div');
movieGenreElement.classList.add('movie-genre');

Genre.split(",").forEach(element => {
    const p = document.createElement('p');
    p.innerHTML = element;
    movieGenreElement.appendChild(p);
});

movieElement.appendChild(movieGenreElement);

movieElement.innerHTML += `<p><strong>Release Date : </strong>${Released}</p>
                           <p><strong>Duration : </strong>${Runtime}</p>
                           <p><strong>Cast : </strong>${Actors}</p>
                           <p><strong>Plot : </strong>${Plot}</p>`
                           
// creating a div for movie poster

const moviePoster = document.createElement('div')
moviePoster.classList.add('movie-poster');
moviePoster.innerHTML = `<img src="${Poster}" alt="Movie Poster">`;

movieContainer.appendChild(moviePoster);
movieContainer.appendChild(movieElement);
}

// Function to show error message
const showErrorMessage = (message) => {
        movieContainer.innerHTML = `<h2>${message}</h2>`;
        movieContainer.classList.add('nobackground');
}


// function to handle form submission 

const handleFormSubmission = (e) => {
e.preventDefault();
    const movieName = movieinput.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    } else {
       showErrorMessage("Enter movie name to get movie details");
    }
}

// Adding event listener to search form
searchForm.addEventListener('submit', handleFormSubmission)
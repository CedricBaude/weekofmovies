const calendar = new VanillaCalendar({
    selector: "#myCalendar",
    onSelect: (data, elem) => {
        selectedDate = new Date(data.date).toISOString().split('T')[0];
        //alert(`Vous avez sélectionné le ${selectedDate}`);
        displayMovie(selectedDate);
    },
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    shortWeekday: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
});

let selectedDate = {};

const movieForm = document.querySelector('#movie-form');
movieForm.addEventListener('submit', addMovie);

const movieList = document.querySelector('#movie-list');
movieList.addEventListener('click', deleteMovie);

function addMovie(e) {
    e.preventDefault();
    const formData = new FormData(movieForm);
    const title = formData.get('title');
    const year = formData.get('year');
    const duration = formData.get('duration');
    const genres = formData.getAll('genres');
    const newMovie = {
        id: Date.now(),
        title,
        year: Number(year),
        duration,
        genres,
        date: selectedDate
    };
    console.log('newMovie', newMovie);
    saveMovie(newMovie);
    movieForm.reset();
}

function saveMovie(movie) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies = [...movies, movie];
    localStorage.setItem("movies", JSON.stringify(movies));
}

function displayMovie(date) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    let moviesAtThisDate = movies.filter((m) => {
        return m.date === date;
    });
    if (moviesAtThisDate.length === 1) {
        console.log('movie to display', moviesAtThisDate);
        const movie = moviesAtThisDate[0];
        movieList.innerHTML = `
        <div>
        <h3>${movie.title}</h3>
        <div>
        <span>année: ${movie.year}</span>
        <span>durée: ${movie.duration}</span>
        <span>genre: ${movie.genres.join(", ")}</span>
        <button data-id="${movie.id}">suppr.</button>
        </div>
        </div>
        `;
    } else if (moviesAtThisDate.length > 1) {
        displayMovies(moviesAtThisDate);
    } else {
        movieList.innerHTML = `
        <div>
        <h3> Aucun film n'est prévu ce jour là.</h3>
        <div>Vous pouvez ajouter un film grâce au formulaire.</div>
        </div>
        `;
    }
}

function displayMovies(movies) {
    let content = [];
    movies.forEach((movie) => {
        const singleMovieHTML = `
        <div>
        <h3>${movie.title}</h3>
        <div>
        <span>année: ${movie.year}</span>
        <span>durée: ${movie.duration}</span>
        <span>genre: ${movie.genres.join(", ")}</span>
        <button data-id="${movie.id}">suppr.</button>
        </div>
        </div>
        `;
        content = [...content, singleMovieHTML];
    });
    console.log('content', content);
    movieList.innerHTML = content.join('');
}

function deleteMovie(e) {
    if (e.target.nodeName.toLowerCase() !== 'button') {
        return;
    }
    const movieId = Number(e.target.dataset.id);
    console.log('movieId', movieId);
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem('movies', JSON.stringify(movies));
    displayMovie(selectedDate);
}
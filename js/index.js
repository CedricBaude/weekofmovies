const calendar = new VanillaCalendar({
    selector: "#myCalendar",
    onSelect: (data, elem) => {
        selectedDate = new Date(data.date).toISOString().split('T')[0];
        //alert(`Vous avez sélectionné le ${selectedDate}`);

    },
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    shortWeekday: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
});

let selectedDate = {};

const movieForm = document.querySelector('#movie-form');
movieForm.addEventListener('submit', addMovie);

function addMovie(e) {
    e.preventDefault();
    const formData = new FormData(movieForm);
    const title = formData.get('title');
    const year = formData.get('year');
    const duration = formData.get('duration');
    const genre = formData.getAll('genre');
    const newMovie = { title, year: Number(year), duration, genre, selectedDate: selectedDate };
    console.log('newMovie', newMovie);
    saveMovie(newMovie);
    movieForm.reset();
}

function saveMovie(movie) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies = [...movies, movie];
    localStorage.setItem("movies", JSON.stringify(movies));
}
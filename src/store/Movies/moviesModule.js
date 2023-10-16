const DUMMY_MOVIES = [
    {
        id: 'm1',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem',
        genre: 'Crime, Comedy',
        favorite: false,
        year: '2022'
    },
    {
        id: 'm2',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title 2',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem',
        genre: 'Comedy',
        favorite: false,
        year: '2023'
    }
]

const MOVIE_API_KEY = '21081c5e';

const moviesModule = {
    state() {
        return {
            movies: DUMMY_MOVIES
        }
    },
    mutations: {
        updateMovies(state, updatedMovies) {
            state.movies = updatedMovies;
        },
        addMovie(state, movie) {
            state.movies.unshift(movie);
        }
    },
    actions: {
        async saveMovie(context, movieName) {
            const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=${MOVIE_API_KEY}`);
            const data = await response.json();

            if (data.Response === 'False') {
                throw new Error(data.Error || 'Faild to fetch!');
            }

            const movie = {
                id: 'm4',
                img: data.Poster,
                title: data.Title,
                description: data.Plot,
                rating: data.imdbRating,
                genre: data.Genre,
                rated: data.Rated,
                year: data.Year,
                runtime: data.Runtime,
                favorite: false
            };

            console.log(movie);
            context.commit('addMovie', movie);
        },
        removeMovie(context, movieId) {
            const filteredMovies = context.state.movies.filter(movie => movie.id !== movieId);
            context.commit('updateMovies', filteredMovies);
        },
        updateMovie(context, movieId) {
            const movie = context.state.movies.find(movie => movie.id === movieId);
            movie.favorite = !movie.favorite;
        }
    },
    getters: {
        movies(state) {
            return state.movies;
        },
        hasMovies(state) {
            return state.movies && state.movie.length > 0;
        },
        favoriteMovies(state) {
            return state.movies.filter(movie => movie.favorite);
        },
        hasFavoriteMovies(_, getters) {
            return getters.favoriteMovies && getters.favoriteMovies.length > 0;
        }
    }
}

export default moviesModule;
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
            movies: DUMMY_MOVIES,
            filteredMovies: [],
            allMoviesOption: 'All'
        }
    },
    mutations: {
        updateMovies(state, updatedMovies) {
            state.movies = updatedMovies;
        },
        updateFilteredMovies(state, updatedMovies) {
            state.filteredMovies = updatedMovies;
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
            const movies = context.state.movies.filter(movie => movie.id !== movieId);
            context.commit('updateMovies', movies);
        },
        updateFavorite(context, movieId) {
            const movie = context.state.movies.find(movie => movie.id === movieId);
            movie.favorite = !movie.favorite;
        },
        filterMovies(context, payload) {
            let filteredMovies = [];
            
            if (payload.genre && payload.genre !== context.state.allMoviesOption) {
                filteredMovies = payload.movies.filter(movie => movie.genre.includes(payload.genre))
            } else {
                filteredMovies = payload.movies;
            }
            context.commit('updateFilteredMovies', filteredMovies);
        },
        searchMovies(context, payload) {
            const filteredMovies = payload.searchTerm ? 
                payload.movies.filter(movie => movie.title.toLowerCase().includes(payload.searchTerm.toLowerCase())) : 
                payload.movies;
            context.commit('updateFilteredMovies', filteredMovies);
        }
    },
    getters: {
        movies(state) {
            return state.movies;
        },
        filteredMovies(state) {
            return state.filteredMovies;
        },
        hasMovies(store) {
            return store.filteredMovies && store.filteredMovies.length > 0;
        },
        favoriteMovies(state) {
            return state.movies.filter(movie => movie.favorite);
        },
        hasFavoriteMovies(_, getters) {
            return getters.favoriteMovies && getters.favoriteMovies.length > 0;
        },
        allMoviesOption(state) {
            return state.allMoviesOption;
        }
    }
}

export default moviesModule;
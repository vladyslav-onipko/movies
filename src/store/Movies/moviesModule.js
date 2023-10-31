const MOVIE_API_KEY = '21081c5e';

const moviesModule = {
    state() {
        return {
            movies: [],
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
        async addMovie(context, movieName) {
            const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${MOVIE_API_KEY}`);
            const data = await response.json();

            if (data.Response === 'False') {
                throw new Error(data.Error || 'Faild to fetch!');
            }
            
            context.dispatch('checkExistingMovie', data.Title);

            const movie = {
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

            await context.dispatch('saveMovie', { movie });
        },
        async saveMovie(context, payload) {
            const userId = context.rootGetters.userId;
            const response = await fetch(`https://movie-holder-default-rtdb.firebaseio.com/users/${userId}/movies.json`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload.movie)
            });
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error.message.toLowerCase().split('_').join(' ');
                throw new Error(errorMessage || 'Failed to save movie.');
            }

            const movie = {
                ...payload.movie,
                id: data.name
            };

            context.commit('addMovie', movie);
        },
        async loadMovies(context) {
            const userId = context.rootGetters.userId;
            const response = await fetch(`https://movie-holder-default-rtdb.firebaseio.com/users/${userId}/movies.json`);
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error.message.toLowerCase().split('_').join(' ');
                throw new Error(errorMessage || 'Failed to load movies.');
            }

            const movies = [];

            for (const movie in data) {
                movies.push({...data[movie], id: movie});
            }

            context.commit('updateMovies', movies);
        },
        async removeMovie(context, movieId) {
            const userId = context.rootGetters.userId;
            const response = await fetch(`https://movie-holder-default-rtdb.firebaseio.com/users/${userId}/movies/${movieId}.json`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error.message.toLowerCase().split('_').join(' ');
                throw new Error(errorMessage || 'Failed to remove movie.');
            }

            const movies = context.state.movies.filter(movie => movie.id !== movieId);
            context.commit('updateMovies', movies);
        },
        async updateFavorite(context, movieId) {
            const userId = context.rootGetters.userId;
            const movie = context.state.movies.find(movie => movie.id === movieId);

            movie.favorite = !movie.favorite;

            const response = await fetch(`https://movie-holder-default-rtdb.firebaseio.com/users/${userId}/movies/${movieId}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            });
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error.message.toLowerCase().split('_').join(' ');
                throw new Error(errorMessage || 'Failed to update movie.');
            }
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
        },
        checkExistingMovie(context, name) {
            context.state.movies.forEach(movie => {
                if (movie.title.includes(name)) {
                    throw new Error('Movie already exist! Please try another.');
                }
            });
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
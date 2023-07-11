const DUMMY_MOVIES = [
    {
        id: 'm1',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem',
        genre: 'Crime, Comedy',
        favorite: false,
    },
    {
        id: 'm2',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title 2',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem',
        genre: 'Comedy',
        favorite: false
    }
]

const MOVIE_API_KEY = '21081c5e';

const moviesModule = {
    state() {
        return {
            movies: DUMMY_MOVIES,
            favorites: [...DUMMY_MOVIES],
            filtered:[]
        }
    },
    mutations: {
        removeMovie(state, payload) {
            state[payload.from] = state[payload.from].filter(movie => movie.id !== payload.id);
        },
        addMovie(state, payload) {
            state[payload.to].unshift(payload.movie);
        },
        checkFavoriteMovie(state, payload) {
            const isFavAlready = state.favorites.find(movie => movie.title === payload.movie.title);
            
            if (isFavAlready) {
                payload.movie.favorite = isFavAlready.favorite;
            }
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
            context.commit('checkFavoriteMovie', { movie });
            context.commit('addMovie', { to: 'movies', movie });   
        },
        updateFavoriteMovie(context, payload) {
            const favoriteMovie = context.state[payload.moviesSection].find(movie => movie.id === payload.id);

            if (favoriteMovie.favorite) {
                favoriteMovie.favorite = !favoriteMovie.favorite;
                context.commit('removeMovie', { from: 'favorites', id: payload.id});
            } else {
                favoriteMovie.favorite = !favoriteMovie.favorite;
                context.commit('addMovie', { to: 'favorites', movie: favoriteMovie });
            }
        }
    },
    getters: {
        movies(state) {
            return state.movies;
        },
        favorites(state) {
            return state.favorites;
        },
        favoritesLength(state) {
            return state.favorites.length;
        },
        filtered(state) {
            return state.filtered;
        }
    }
}

export default moviesModule;
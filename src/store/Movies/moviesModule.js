const DUMMY_MOVIES = [
    {
        id: 'm1',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem',
        genre: 'Crime'
    },
    {
        id: 'm2',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title 2',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem',
        genre: 'Comedy'
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
        removeMovie(state, movieID) {
            state.movies = state.movies.filter(movie => movie.id !== movieID);
        }
    },
    actions: {
        async addMovie(context, movieName) {
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
                runtime: data.Runtime
            }

            console.log(movie);

            context.state.movies.unshift(movie);
        }
    },
    getters: {
        movies(state) {
            return state.movies;
        }
    }
}

export default moviesModule;
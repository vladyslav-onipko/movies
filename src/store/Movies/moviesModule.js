const DUMMY_MOVIES = [
    {
        id: 'm1',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem'
    },
    {
        id: 'm2',
        img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        title: 'title 2',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem'
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
        async saveMovie(context, data) {
            const response = await fetch(`http://www.omdbapi.com/?t=${data.movie}&apikey=${MOVIE_API_KEY}`);
            const responseData = await response.json();
            
            console.log(responseData);

            if (responseData.Response === 'False') {
                throw new Error(responseData.Error || 'Faild to fetch!');
            }

            const movie = {
                id: 'm4',
                img: responseData.Poster,
                title: responseData.Title,
                description: responseData.Plot,
            }

            context.state.movies.unshift(movie);
        }
    },
    getters: {
        movies(state) {
            return state.movies;
        },
        error(state) {
            return state.error;
        }
    }
}

export default moviesModule;
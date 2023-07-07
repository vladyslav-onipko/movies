<template>
    <movie-detail
        :id="selectedMovie.id"
        :img="selectedMovie.img"
        :title="selectedMovie.title"
        :rating="selectedMovie.rating"
        :rated="selectedMovie.rated"
        :year="selectedMovie.year"
        :genres="selectedMovie.genre"
        :runtime="selectedMovie.runtime"
        :description="selectedMovie.description"
    ></movie-detail>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import MovieDetail from '../../components/Movies/MovieDetail.vue';

export default {
    props: ['id'],
    components: {
        MovieDetail
    },
    setup(props) {
        const store = useStore();
        const selectedMovie = ref(null);
        const movies = store.getters.movies;

        selectedMovie.value = movies.find(movie => movie.id === props.id);
        
        return { selectedMovie };
    }
}
</script>
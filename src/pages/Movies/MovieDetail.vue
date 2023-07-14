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
        :favorite="selectedMovie.favorite"
        :moviesSection="previousPage"
    ></movie-detail>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MovieDetail from '../../components/Movies/MovieDetail.vue';

export default {
    props: ['id'],
    components: {
        MovieDetail
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const selectedMovie = ref(null);

        const previousPage = computed(() => {
            const [lastPath] = router.options.history.state.back
            .split('?')[0]
            .split('/')
            .slice(-1); // getting last word from url
            
            return lastPath ? lastPath : '/';
        });

        const movies = store.getters[previousPage.value];
        selectedMovie.value = movies.find(movie => movie.id === props.id);
        
        return { selectedMovie, previousPage };
    }
}
</script>
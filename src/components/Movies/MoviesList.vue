<template>
    <tools-bar></tools-bar>
    <transition-group class="movies-list" tag="ul" name="movies-list" v-if="hasMovies">
        <movie-item v-for="movie in filteredMovies" 
            :key="movie.id" 
            :id="movie.id" 
            :img="movie.img" 
            :title="movie.title" 
            :description="movie.description"
        ></movie-item>
    </transition-group>
    <movie-placeholder text="No movies yet" v-else></movie-placeholder>
</template>

<script>
import { computed, provide, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import MovieItem from './MovieItem.vue';
import MoviePlaceholder from './MoviePlaceholder.vue';
import ToolsBar from '../../components/Tools/ToolsBar.vue';

export default {
    props: ['movies'],
    components: {
        MovieItem,
        MoviePlaceholder,
        ToolsBar
    },
    setup(props) {
        const route = useRoute();
        const store = useStore();

        const filterQuery = computed(() => route.query.filter);
        const movies = computed(() => props.movies);
        const filteredMovies = computed(() => store.getters.filteredMovies);
        const hasMovies = computed(() => store.getters.hasMovies);
        
        store.dispatch('filterMovies', { ganre: filterQuery.value, movies: movies.value });

        watch(movies, () => {
            store.dispatch('filterMovies', { ganre: filterQuery.value, movies: movies.value });
        });

        provide('selectedMovies', movies);
        
        return { filteredMovies, hasMovies };
    }
}
</script>

<style lang="scss" scoped>
.movies-list {
    list-style: none;
    margin: 0;
}

.movies-list-enter-active {
    animation: list-enter 0.5s;
}

.movies-list-leave-active {
    animation: list-leave 0.5s;
}
</style>
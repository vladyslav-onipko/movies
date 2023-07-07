<template>
    <transition-group class="movies-list" tag="ul" name="movies-list" v-if="filteredMovies.length">
        <movie-item v-for="movie in filteredMovies" 
            :key="movie.id" 
            :id="movie.id" 
            :img="movie.img" 
            :title="movie.title" 
            :description="movie.description"
        ></movie-item>
    </transition-group>
    <movie-placeholder text="Add your first movie" v-else></movie-placeholder>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import MovieItem from './MovieItem.vue';
import MoviePlaceholder from './MoviePlaceholder.vue';

export default {
    props: ['movies'],
    components: {
        MovieItem,
        MoviePlaceholder
    },
    setup(props) {
        const route = useRoute();
        const queryGenre = computed(() => route.query.filter);

        const filteredMovies = computed(() => {
            return queryGenre.value ? props.movies.filter(movie => movie.genre.includes(queryGenre.value)) : props.movies;
        });

        return { filteredMovies };
    }
}
</script>

<style lang="scss" scoped>
.movies-list {
    list-style: none;
    margin: 0;
    padding: 20px;
}

.movies-list-enter-active {
    animation: list-enter 0.5s;
}

.movies-list-leave-active {
    animation: list-leave 0.5s;
}
</style>
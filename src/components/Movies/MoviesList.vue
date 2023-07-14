<template>
    <tools-bar @movieSort="toggleSort"></tools-bar>
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
        const queryGenre = computed(() => route.query.filter);
        let sorted = false;

        const filteredMovies = computed(() => {
            return queryGenre.value ? props.movies.filter(movie => movie.genre.includes(queryGenre.value)) : props.movies;
        });

        const toggleSort = () => {
            if (sorted) {
                filteredMovies.value.sort((a, b) => a.year < b.year ? -1 : 1);
            } else {
                filteredMovies.value.sort((a, b) => a.year > b.year ? -1 : 1);
            }
            sorted = !sorted;
        };
        
        return { filteredMovies, toggleSort };
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
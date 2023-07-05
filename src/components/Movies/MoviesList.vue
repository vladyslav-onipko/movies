<template>
    <transition-group class="movies-list" tag="ul" name="movies-list" v-if="movies.length">
        <movie-item v-for="movie in movies" 
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
import MovieItem from './MovieItem.vue';
import MoviePlaceholder from './MoviePlaceholder.vue';

export default {
    props: ['movies'],
    components: {
        MovieItem,
        MoviePlaceholder
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
<template>
    <base-section class="movies" title="Movies" :hiddenTitle="true">
        <transition-group class="movies__list" tag="ul" name="movies-list">
            <movie-item v-for="movie in movies" 
                :key="movie.id" 
                :id="movie.id" 
                :img="movie.img" 
                :title="movie.title" 
                :description="movie.description"
            ></movie-item>
        </transition-group>
    </base-section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import MovieItem from '../../components/Movies/MovieItem.vue';

export default {
    components: {
        MovieItem,
    },
    setup() {
        const store = useStore();
        const movies = computed(() => store.getters.movies);

        return { movies };
    }
}
</script>

<style lang="scss" scoped>
.movies {
    @include size(100%);
    overflow: hidden;
    
    &__list {
        list-style: none;
        margin: 0;
        padding: 30px 20px;
    }
}
</style>
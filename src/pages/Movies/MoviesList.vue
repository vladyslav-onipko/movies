<template>
    <base-section class="movies" title="Movies" :hiddenTitle="true">
        <tools-bar></tools-bar>
        <movies-list :movies="filteredMovies"></movies-list>
    </base-section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import MoviesList from '../../components/Movies/MoviesList.vue';
import ToolsBar from '../../components/Tools/ToolsBar.vue';

export default {
    components: {
        MoviesList,
        ToolsBar
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        
        const movies = computed(() => store.getters.movies);
        const query = computed(() => route.query.filter);

        const filteredMovies = computed(() => {
            return query.value ? movies.value.filter(movie => movie.genre.includes(query.value)) : [...movies.value];
        });

        return { filteredMovies };
    }
}
</script>

<style lang="scss" scoped>
.movies {
    @include size(100%);
    overflow: hidden;
}
</style>
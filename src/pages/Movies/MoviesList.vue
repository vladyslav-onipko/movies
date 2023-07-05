<template>
    <base-section class="movies" title="Movies" :hiddenTitle="true">
        <tools-bar></tools-bar>
        <movies-list :movies="movies"></movies-list>
    </base-section>
</template>

<script>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
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
        const movies = computed(() => store.getters.filteredMovies);
        const query = computed(() => route.query.filter);

        store.commit('filterMovies', query.value);

        watch(query, (newQuery) => {
           store.commit('filterMovies', newQuery);
        })

        return { movies };
    }
}
</script>

<style lang="scss" scoped>
.movies {
    @include size(100%);
    overflow: hidden;
}
</style>
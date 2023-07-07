<template>
    <base-section class="movies-favorites" title="Movies" :hiddenTitle="true">
        <tools-bar></tools-bar>
        <movies-list :movies="favoriteMovies"></movies-list>
    </base-section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import MoviesList from '../../components/Movies/MoviesList.vue';
import ToolsBar from '../../components/Tools/ToolsBar.vue';

export default {
    components: {
        MoviesList,
        ToolsBar
    },
    setup() {
        const store = useStore();
        const favoriteMovies = computed(() => store.getters.favorites);

        return { favoriteMovies };
    }
}
</script>
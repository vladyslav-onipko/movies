<template>
    <base-section class="movies" title="Movies" :hiddenTitle="true">
        <tools-bar></tools-bar>
        <movies-list :movies="movies"></movies-list>
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
        const movies = computed(() => store.getters.movies);

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
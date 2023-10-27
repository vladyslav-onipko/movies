<template>
    <base-section class="movies" title="Movies" :hiddenTitle="true">
        <add-movie></add-movie>
        <movies-list :movies="movies"></movies-list>
    </base-section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import MoviesList from '../../components/Movies/MoviesList.vue';
import AddMovie from '../../components/Movies/AddMovie.vue';

export default {
    components: {
        MoviesList,
        AddMovie
    },
    setup() {
        const store = useStore();
        const movies = computed(() => store.getters.movies);

        return { movies };
    }
}
</script>
<template>
    <base-section class="movies" title="Movies" :hiddenTitle="true">
        <movies-list :movies="movies"></movies-list>
    </base-section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import MoviesList from '../../components/Movies/MoviesList.vue';

export default {
    components: {
        MoviesList
    },
    setup() {
        const store = useStore();
        const movies = computed(() => store.getters.movies);

        return { movies };
    }
}
</script>
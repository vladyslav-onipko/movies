<template>
    <base-section class="movies-favorites" title="Movies" :hiddenTitle="true">
        <movies-list :movies="favoriteMovies"></movies-list>
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
        const favoriteMovies = computed(() => store.getters.favorites);

        return { favoriteMovies };
    }
}
</script>
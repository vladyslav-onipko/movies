<template>
    <div class="movies-filter">
        <base-select id="filter" :modelValue="selectedOption" label="Filter" :hiddenLabel="true" @changeSelect="changeHandler">
            <option v-for="genre in genres" :value="genre" :key="genre">{{ genre }}</option>
        </base-select>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { computed, inject, watch } from 'vue';
import { useStore } from 'vuex';

import BaseSelect from '../../ui/BaseSelect.vue';

export default {
    components: {
        BaseSelect
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const filterQuery = computed(() => route.query.filter);
        const movies = inject('selectedMovies');
        const allMoviesOption = store.getters.allMoviesOption;

        const genres = computed(() => {
            const genresArr = movies.value.map(movie => movie.genre.split(','));
            genresArr.unshift(allMoviesOption);
            return [...new Set(genresArr.flat().map(genre => genre.trim()))];
        });

        const selectedOption = computed(() => {
            return genres.value.find(genre => genre === filterQuery.value) || allMoviesOption;
        });

        const changeHandler = (target) => {
            const link = target.value ? `${route.path}?filter=${target.value}` : route.path;
            store.dispatch('filterMovies', { genre: target.value, movies: movies.value });
            router.push(link);
        };

        watch(filterQuery, (value) => {
            if (!value) {
                store.dispatch('filterMovies', { genre: value, movies: movies.value });
            }
        });

        return { changeHandler, genres, selectedOption };
    }
}
</script>
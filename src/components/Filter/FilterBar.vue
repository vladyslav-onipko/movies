<template>
    <div class="movies-filter">
        <base-select id="filter" label="Filter" ref="selectFilter" :hiddenLabel="true" @changeSelect="changeHandler">
            <option value="">All</option>
            <option v-for="genre in genres" :value="genre" :key="genre">{{ genre }}</option>
        </base-select>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted, watch, inject } from 'vue';
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

        const selectFilter = ref(null);
        const filterQuery = computed(() => route.query.filter);
        const movies = inject('selectedMovies');

        const genres = computed(() => {
            const genresArr = movies.value.map(movie => movie.genre.split(','));
            return [...new Set(genresArr.flat().map(genre => genre.trim()))];
        });
        
        const changeHandler = (target) => {
            const link = target.value ? `${route.path}?filter=${target.value}` : route.path;
            store.dispatch('filterMovies', { ganre: target.value, movies: movies.value });
            router.push(link);
        };

        watch(filterQuery, (value) => {
            if (!value) {
                selectFilter.value.select.value = '';
            }
        });

        onMounted(() => {
            selectFilter.value.select.value = filterQuery.value ? filterQuery.value : '';
        });

        return { changeHandler, selectFilter, genres };
    }
}
</script>
<template>
    <div class="movie-filter">
        <base-select id="filter" label="Filter" ref="selectFilter" :hiddenLabel="true" @changeSelect="changeHandler">
            <option value="">All</option>
            <option v-for="genre in genres" :value="genre" :key="genre">{{ genre }}</option>
        </base-select>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
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
        const [moviesSection] = route.path.split('/').slice(-1);
        const movies = computed(() => store.getters[moviesSection]);

        const genres = computed(() => {
            const genresArr = movies.value.map(movie => movie.genre.split(','));
            return [...new Set(genresArr.flat().map(genre => genre.trim()))];
        });
        
        const changeHandler = (target) => {
            const link = target.value ? `${route.path}?filter=${target.value}` : route.path;
            router.push(link);
        };

        onMounted(() => {
            selectFilter.value.selectTarget.value = route.query.filter ? route.query.filter : '';
        });

        return { changeHandler, selectFilter, genres };
    }
}
</script>

<style lang="scss" scoped>
.movie-filter {
    padding: 0 10px;
    width: 25%;
}
</style>
<template>
    <div class="movies-search">
        <base-input
            :hiddenLabel="true"
            label="Search movie"
            id="search" 
            name="search" 
            placeholder="Search.."
            v-model.trim="searchTerm"
            ref="searchInput"
        ></base-input>
    </div>
</template>

<script>
import { ref, watch, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import BaseInput from '../../ui/BaseInput.vue';

export default {
    components: {
        BaseInput
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const searchTerm = ref('');
        const searchInput = ref(null);
        const movies = inject('selectedMovies');

        watch(searchTerm, (term) => {
            store.dispatch('searchMovies', { searchTerm: term, movies: movies.value });
            router.replace({ query: {} });
        });

        return { searchTerm, searchInput };
    }
}
</script>

<style lang="scss">
.movies-search {
    .form-control {
        input {
            border: 1px solid $color-1--2;
            color: inherit;
            font-size: inherit;
            padding: 0.25em 0.5em;

            &::placeholder {
                color: $color-1--1;
                font-size: inherit;
            }
        }
    }
}
</style>
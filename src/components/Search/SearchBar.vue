<template>
    <div class="movies-search">
        <base-input
            :hiddenLabel="true"
            label="Search movie"
            id="search-movie" 
            name="search-movie" 
            placeholder="Search.."
            v-model.trim="movieName"
        ></base-input>
    </div>
</template>

<script>
import { ref } from 'vue';

import BaseInput from '../../ui/BaseInput.vue';

export default {
    components: {
        BaseInput
    },
    setup() {
        const movieName = ref('');
        
        return { movieName };
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
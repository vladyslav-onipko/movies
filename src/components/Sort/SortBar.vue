<template>
    <div class="movies-sort">
        <base-button class="movies-sort__toggle" @click="toggleSort">
            <base-icon class="movies-sort__toggle-icon" prefix="fas" iconName="arrow-up"></base-icon>
            <base-icon class="movies-sort__toggle-icon" prefix="fas" iconName="arrow-down"></base-icon>
            <span class="movies-sort__text">Sort by year</span>
        </base-button>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const movies = computed(() => store.getters.filteredMovies);
        
        let sorted = false;
        
        const toggleSort = () => {
            if (sorted) {
                movies.value.sort((a, b) => a.year < b.year ? -1 : 1);
            } else {
                movies.value.sort((a, b) => a.year > b.year ? -1 : 1);
            }
            sorted = !sorted;
        };

        return { toggleSort };
    }
}
</script>

<style lang="scss" scoped>
.movies-sort {
    $this: &;
    color: $color-1--1;

    &__toggle[class] {
        @include size(100%);
        align-items: center;
        border-radius: 4px;
        color: inherit;
        display: flex;
        font-size: inherit;
        justify-content: center;
        margin: 0;
        min-height: 30px;
        padding: 0.25em 0.5em;

        @include hover() {
            background-color: transparent;
            box-shadow: 0 0 15px 0 rgba($color-1--2,.75);
            color: inherit
        }

        #{$this}__toggle-icon {
            @include size(15px);
        }
    }

    &__text {
        margin-left: 5px;

        @include media-max(479) {
            display: none;
        }
    }
}
</style>
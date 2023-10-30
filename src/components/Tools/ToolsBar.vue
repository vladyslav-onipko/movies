<template>
    <div class="movies-tool">
        <ul class="movies-tool__list">
            <li class="movies-tool__list-item">
                <search-bar></search-bar>
            </li>
            <li class="movies-tool__list-item">
                <sort-bar></sort-bar>
            </li>
            <li class="movies-tool__list-item">
                <filter-bar></filter-bar>
            </li>
        </ul>
    </div>
</template>
<script>
import FilterBar from '../Filter/FilterBar.vue';
import SortBar from '../Sort/SortBar.vue';
import SearchBar from '../Search/SearchBar.vue';

export default {
    components: {
        FilterBar,
        SortBar,
        SearchBar
    }
}
</script>

<style lang="scss" scoped>
.movies-tool {
    color: $color-1--1;
    display: flex;
    font-size: 1.2rem;
    justify-content: center;
    margin: 0 -10px 20px;

    @include media-max(767) {
        margin: 0 -5px 20px;
    }

    &__list {
        align-items: center;
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;

        &-item {
            padding: 0 10px;
            width: calc(100% / 4);

            @include media-max(767) {
                padding: 0 5px;
                width: calc(100% / 3);
            }

            @include media-max(479) {
                width: auto;
            }

            &:first-child {
                margin-right: auto;
            }

            &:nth-child(2) {
                order: 1;
            }
        }
    }
}
</style>
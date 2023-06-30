<template>
    <section class="movies">
        <h2 class="ghost">Films</h2>
        <ul class="movies__list">
            <movie-item></movie-item>
            <movie-item></movie-item>
        </ul>
    </section>
</template>

<script>
import MovieItem from '../../components/Movies/MovieItem.vue';
export default {
    components: {
        MovieItem,
    }
}
</script>

<style lang="scss" scoped>
.movies {
    @include size(100%);
    border: 2px solid $color-1--2;
    border-radius: 4px;
    
    &__list {
        list-style: none;
        margin: 0;
        max-height: 700px;
        overflow-y: auto;
        padding: 0 20px;
    }
}
</style>
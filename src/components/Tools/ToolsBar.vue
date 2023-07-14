<template>
    <div class="movie-tools">
        <sortbar @sortHandler="$.emit('movieSort')"></sortbar>
        <filter-bar></filter-bar>
    </div>
</template>
<script>
import FilterBar from '../Filter/FilterBar.vue';
import Sortbar from '../Sort/SortBar.vue';

export default {
    components: {
        FilterBar,
        Sortbar
    }
}
</script>

<style lang="scss" scoped>
.movie-tools {
    display: flex;
    font-size: 1.2rem;
    justify-content: center;
    margin: 20px auto 0;
    padding: 5px;
    width: 80%;
}
</style>
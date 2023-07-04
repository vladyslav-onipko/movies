<template>
    <div class="tools-bar">
        <sortbar></sortbar>
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
.tools-bar {
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
    padding: 5px;
    width: 80%;
}
</style>
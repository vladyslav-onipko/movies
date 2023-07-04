<template>
    <div class="filter-bar">
        <base-select id="filter">
            <option value="">Filter</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
        </base-select>
    </div>
</template>

<script>
import BaseSelect from '../../ui/BaseSelect.vue';

export default {
    components: {
        BaseSelect
    }
}
</script>

<style lang="scss" scoped>
.filter-bar {
    padding: 0 10px;
    width: 25%;
}
</style>
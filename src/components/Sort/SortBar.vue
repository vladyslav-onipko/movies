<template>
    <div class="sort-bar">
        <base-select id="sort">
            <option value="">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
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
.sort-bar {
    padding: 0 10px;
    width: 25%;
}
</style>
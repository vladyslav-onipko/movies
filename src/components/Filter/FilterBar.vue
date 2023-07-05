<template>
    <div class="filter-bar">
        <base-select id="filter" @changeSelect="changeHandler">
            <option value="">All</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
        </base-select>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

import BaseSelect from '../../ui/BaseSelect.vue';

export default {
    components: {
        BaseSelect
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const changeHandler = (target) => {
            const link = target.value ? `${route.path}?filter=${target.value}` : '/'
            router.push(link);
        };

        return { changeHandler };
    }
}
</script>

<style lang="scss" scoped>
.filter-bar {
    padding: 0 10px;
    width: 25%;
}
</style>
<template>
    <div class="filter-bar">
        <base-select id="filter" label="Filter" ref="selectFilter" :hiddenLabel="true" @changeSelect="changeHandler">
            <option value="">All</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
        </base-select>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import BaseSelect from '../../ui/BaseSelect.vue';

export default {
    components: {
        BaseSelect
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const selectFilter = ref(null);

        const changeHandler = (target) => {
            const link = target.value ? `${route.path}?filter=${target.value}` : '/'
            router.push(link);
        };

        onMounted(() => {
            selectFilter.value.selectTarget.value = route.query.filter ? route.query.filter : '';
        });

        return { changeHandler, selectFilter };
    }
}
</script>

<style lang="scss" scoped>
.filter-bar {
    padding: 0 10px;
    width: 25%;
}
</style>
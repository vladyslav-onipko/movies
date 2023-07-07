<template>
    <section class="section">
        <h2 class="title" :class="!hiddenTitle || 'ghost'" v-if="title">{{ title }}</h2>
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: ['title', 'hiddenTitle'],
}
</script>

<style lang="scss" scoped>
.section {
    @include size(100%);
    box-shadow: 0 0 15px 0 rgba($color-1--2,.75);
    border-radius: 4px;
    margin: 50px 0;
    overflow: hidden;
}
</style>
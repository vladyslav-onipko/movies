<template>
    <form class="form" novalidate>
        <slot></slot>
        <div class="form-actions" v-if="actions">
            <slot name="actions"></slot>
        </div>
    </form>
</template>

<script>
export default {
    props: ['actions']
}
</script>

<style lang="scss" scoped>
.form {
    display: block;
    position: relative;
}
</style>
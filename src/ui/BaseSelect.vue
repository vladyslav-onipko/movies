<template>
    <label :for="id" :class="labelVisibility">{{ label }}</label>
    <select :name="id" :id="id">
        <slot></slot>
    </select>
</template>

<script>
import { computed } from 'vue';

export default {
    props: ['id', 'label'],
    setup(props) {
        const labelVisibility = computed(() => !props.label ? 'ghost': '' );

        return { labelVisibility };
    }
}
</script>

<style lang="scss" scoped>
select {
    @include transition;
    background-color: $color-white;
    background-image: linear-gradient(to top, $color-white, $color-white 33%);
    border: 1px solid $color-1--2;
    border-radius: 0.25em;
    color: $color-1--1;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1.1;
    min-height: 30px;
    padding: 0.25em 0.5em;
    width: 100%;

    @include hover() {
        box-shadow: 0 0 15px 0 rgba($color-1--2,.75);
    }

    &:focus {
        box-shadow: 0 0 6px 0 $color-1--2;
        outline: 1px solid rgba($color-1--2, 0.5);
        outline-offset: 0;
    }
}
</style>
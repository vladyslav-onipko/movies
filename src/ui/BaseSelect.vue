<template>
    <label :for="id" :class="!hiddenLabel || 'ghost'">{{ label }}</label>
    <select :name="id" :id="id" ref="selectTarget" :value="modelValue" @input="updateValue" @change="changeValue">
        <slot></slot>
    </select>
</template>

<script>
import { ref } from 'vue';

export default {
    props: ['id', 'label', 'modelValue', 'hiddenLabel'],
    emits: ['update:modelValue', 'change-select'],
    setup(_, context) {
        const selectTarget = ref(null);

        const updateValue = (e) => {
            context.emit('update:modelValue', e.target.value);
        }

        const changeValue = (e) => {
            context.emit('change-select', e.target);
        }

        return { updateValue, changeValue, selectTarget };
    }
}
</script>

<style lang="scss" scoped>
select {
    @include transition;
    background-color: $color-white;
    background-image: linear-gradient(to top, $color-white, $color-white 33%);
    border: 1px solid $color-1--2;
    border-radius: 4px;
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
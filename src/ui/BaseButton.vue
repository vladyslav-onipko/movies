<template>
    <button :type="btnType" ref="toggle" class="btn" :class="modifier" v-if="!link">
        <slot></slot>
    </button>
    <router-link :to="to" class="btn" :class="modifier" v-else>
        <slot></slot>
    </router-link>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props: ['type', 'modifier', 'link', 'to'],
    setup(props) {
        const btnType = computed(() => props.type ? props.type : 'button');
        const toggle = ref(null);

        return { btnType, toggle }
    }
}
</script>

<style scoped lang="scss">
.btn {
    @include transition;
    background-color: transparent;
    border: 1px solid $color-1--2;
    border-radius: 30px;
    color: $color-1--2;
    cursor: pointer;
    font-size: 1.8rem;
    margin: 0 10px;
    padding: 10px 25px;
    text-decoration: none;

    &.is-secondary {
        background-color: $color-1--1;
        border-color: $color-1--1;
        color: $color-2--2;
    }

    &.is-tertiary {
        border: 1px solid $color-2--2;
        color: $color-2--2;

        @include hover() {
            background-color: $color-1--1;
            border-color: $color-1--1;
            color: $color-2--2;
        }
    }

    &.is-only-icon {
        border: none;
        padding: 0;

        @include hover() {
        background-color: transparent;
        color: $color-1--1;
    }
    }

    @include hover() {
        background-color: $color-1--2;
        border-color: $color-1--2;
        color: $color-2--2;
    }
}
</style>

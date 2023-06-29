<template>
    <li class="nav__item">
        <router-link :to="to" class="nav__link">{{ linkText }}</router-link>
    </li>
</template>

<script>
import { computed } from 'vue';

export default {
    props: ['to', 'text'],
    setup(props) {
        const linkText = computed(() => props.text.toUpperCase());

        return { linkText }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    &__item {
        margin: 0 10px;
    }

    &__link {
        @include transition;
        border-radius: 4px;
        color: $color-2--2;
        font-size: 1.8rem;
        padding: 10px 15px;
        text-decoration: none;

        @include hover() {
            background-color: $color-1--1;
        }

        &.is-active,
        &.is-ex-active {
            background-color: $color-1--1;
        }
    }
}
</style>
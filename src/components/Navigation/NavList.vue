<template>
    <nav class="nav" role="navigation">
        <ul class="nav__list">
            <nav-item v-for="link in navLinks" 
                :to="link.href" 
                :text="link.text" 
                :key="link.text"
                :badge="link.hasBadge">
            </nav-item>
        </ul>
    </nav>
</template>

<script>
import NavItem from './NavItem.vue';
import links from '../../js/nav-links.js';

import { ref } from 'vue';

export default {
    components: {
        NavItem,
    },
    setup() {
        const navLinks = ref(links);

        return { navLinks };
    }
}
</script>

<style lang="scss" scoped>
.nav {
    height: 100%;

    @include media-max(767) {
        margin: 25px 0 50px;
    }

    &__list {
        align-items: center;
        display: flex;
        height: 100%;
        list-style: none;
        margin: 0;
        padding: 0;

        @include media-max(767) {
            justify-content: center;
            height: 80px;
        }
    }
}
</style>
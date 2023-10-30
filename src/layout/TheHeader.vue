<template>
    <header class="header" role="banner">
        <div class="header__logo">
            <header-logo></header-logo>
        </div>
        <div class="header__nav">
           <nav-list></nav-list>
        </div>
        <div class="header__nav is-aside" :class="{ 'is-open': isOpen }">
            <div class="mob-nav" aria-modal="true" role="dialog">
                <base-button class="mob-nav__close" @click="toggleNav">
                    <base-icon prefix="fas" icon-name="times"></base-icon>
                </base-button>
                <nav-list></nav-list>
                <header-auth></header-auth>
            </div>
            <div class="mob-nav-overlay" :class="{ 'is-open': isOpen }" @click="toggleNav" :aria-expanded="isOpen"></div>
        </div>
        <div class="header__login">
            <header-auth></header-auth>
        </div>
        <nav class="header__nav-toggle">
            <base-button @click="toggleNav" class="mob-nav-toggle" aria-haspopup="true">
                <base-icon prefix="fas" icon-name="bars"></base-icon>
            </base-button>
        </nav>
    </header>
</template>

<script>
import HeaderLogo from '../components/Logo/HeaderLogo.vue';
import HeaderAuth from '../components/Authentication/HeaderAuth.vue';
import NavList from '../components/Navigation/NavList.vue';

import { ref, provide } from 'vue';

export default {
    components: {
        HeaderLogo,
        HeaderAuth,
        NavList,
    },
    setup() {
        const isOpen = ref(false);
    
        const toggleNav = () => {
            const windowWidth = window.innerWidth;
            
            if (windowWidth < 768) {
                isOpen.value = !isOpen.value;
            }
        };

        provide('toggleNav', toggleNav);

        return { toggleNav, isOpen };
    }
}
</script>

<style scoped lang="scss">
.header {
    $this: &;
    align-items: center;
    background-color: $color-1--2;
    display: flex;
    justify-content: space-between;
    height: 90px;
    max-height: 100px;
    min-height: 90px;
    padding: 0 50px;

    @include media-max(1279) {
        padding: 0 25px;
    }

    &__nav {
        height: 100%;

        @include media-max(767) {
            display: none;
        }

        &.is-aside[class] {
            @include transition;
            @include size(100%, 100vh);
            display: block;
            left: 0;
            margin-left: auto;
            overflow: hidden auto;
            position: fixed;
            padding: 40px 20px;
            right: 0;
            top: 0;
            transform: translateX(120%);
            visibility: hidden;
            will-change: transform;
            z-index: 10000;

            &.is-open {
                transform: translateX(0);
                visibility: visible;
            }
        }
    }

    &__nav-toggle {
        display: none;
        
        @include media-max(767) {
            display: block;
        }
    }

    &__login {
        height: 100%;

        @include media-max(767) {
            display: none;
        }
    }

    .mob-nav {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 10000;

        &__close {
            align-self: flex-end;
            border-color: $color-2--2;
            color: $color-2--2;
            padding: 10px;
        }
    }

    .mob-nav-toggle {
        color: $color-2--2;
        margin: 0;
        padding: 0;

        .svg-wrapper {
            @include size(40px);
        }
    }

    .mob-nav-overlay {
        @include transition;
        @include size(100%, 100vh);
        background-color: rgba($color-black, 0.9);
        bottom: 0;
        left: 0;
        opacity: 0;
        position: fixed;
        right: 0;
        top: 0;
        visibility: hidden;
        will-change: opacity;
        z-index: 9999;

        &.is-open {
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>

<template>
    <li class="nav__item">
        <router-link :to="to" class="nav__link">
            {{ linkText }}
            <span class="nav__link-badge" :class="activeBadgeClass" v-if="hasBadge">{{ favoritesLength }}</span>
        </router-link>
    </li>
</template>

<script>
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    props: ['to', 'text', 'badge'],
    setup(props) {
        const store = useStore();
        const linkText = computed(() => props.text.toUpperCase());
        const favoritesLength = computed(() => store.getters.favoritesLength);
        const hasBadge = computed(() => props.badge && favoritesLength.value);
        const activeBadgeClass = ref('');

        watch(favoritesLength, () => {
            activeBadgeClass.value = 'is-active';

            setTimeout(() => {
                activeBadgeClass.value = '';
            }, 300)
        });
        
        return { linkText, favoritesLength, hasBadge, activeBadgeClass }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    $this: &;

    &__item {
        margin: 0 10px;
    }

    &__link {
        @include transition;
        border-radius: 4px;
        color: $color-2--2;
        font-size: 1.8rem;
        padding: 10px 15px;
        position: relative;
        text-decoration: none;

        @include hover() {
            background-color: $color-1--1;
        }

        #{$this}__link-badge {
            @include transition;
            background-color: $color-1--1;
            border: 1px solid $color-1--1;
            border-radius: 50%;
            color: $color-2--2;
            font-size: 1.1rem;
            font-weight: 700;
            padding: 5px 8px;
            position: absolute;
            top: -10px;
            right: -15px;

            &.is-active {
                transform: scale(1.5);
            }
        }

        &.is-active,
        &.is-ex-active {
            border: 1px solid $color-2--2;
        }
    }
}
</style>
<template>
    <div class="login">
        <base-button v-if="!isAuth" modifier="is-tertiary is-login" link="true" to="/login" @click="toggleNav">Login</base-button>
        <base-button v-if="!isAuth" modifier="is-secondary is-singup" link="true" to="/singup" @click="toggleNav">Sign up</base-button>
        <base-button v-if="isAuth" modifier="is-secondary" @click="logout">Logout</base-button>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, inject } from 'vue';

export default {
    setup() {
        const store = useStore();
        const isAuth = computed(() => store.getters.isAuthenticated);
        const toggleNav = inject('toggleNav');
        
        const logout = () => {
            store.dispatch('logout');
            toggleNav();
        };

        return { isAuth, logout, toggleNav };
    }
}
</script>

<style lang="scss" scoped>
.login {
    align-items: center;
    display: flex;
    height: 100%;

    @include media-max(767) {
        justify-content: center;
        height: auto;
    }

    .btn {
        @include media-max(767) {
            min-width: 100px;
        }
        &.is-singup {
            @include hover() {
                background-color: $color-2--2;
                border: 1px solid $color-2--2;
                color: $color-1--1;
            }
        }
    }
}
</style>
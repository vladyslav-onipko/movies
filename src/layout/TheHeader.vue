<template>
    <header class="header" role="banner">
        <div class="header__logo">
            <header-logo></header-logo>
        </div>
        <div class="header__nav">
           <nav-list></nav-list>
        </div>
        <div class="header__login">
            <header-login></header-login>
        </div>
    </header>
</template>

<script>
import HeaderLogo from '../components/Logo/HeaderLogo.vue';
import HeaderLogin from '../components/Login/HeaderLogin.vue';
import NavList from '../components/Navigation/NavList.vue';

export default {
    components: {
        HeaderLogo,
        HeaderLogin,
        NavList,
    }
}
</script>

<style scoped lang="scss">
.header {
    align-items: center;
    background-color: $color-1--2;
    display: flex;
    justify-content: space-between;
    height: 90px;
    max-height: 100px;
    min-height: 90px;
    padding: 0 50px;

    &__nav {
        height: 100%;
    }

    &__login {
        height: 100%;
    }
}
</style>

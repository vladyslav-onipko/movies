<template>
    <div class="login">
        <base-button modifier="is-tertiary is-login" link="true" to="/">Login</base-button>
        <base-button modifier="is-secondary is-singup" link="true" to="/">Sign up</base-button>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.login {
    align-items: center;
    display: flex;
    height: 100%;

    .btn {
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
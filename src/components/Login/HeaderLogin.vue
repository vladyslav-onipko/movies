<template>
    <div class="login">
        <base-button modifier="is-tertiary" link="true" to="#">Login</base-button>
        <base-button modifier="is-secondary" link="true" to="#">Sing up</base-button>
    </div>
</template>

<script>
import BaseButton from '../../ui/BaseButton.vue';
export default {
    components: {
        BaseButton,
    }
}
</script>

<style lang="scss" scoped>
.login {
    align-items: center;
    display: flex;
    height: 100%;
}
</style>
<template>
    <p class="error-message">
        <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
.error-message {
    color: $color-red;
    font-size: 1.2rem;
    font-style: italic;
    position: absolute;
    bottom: -20px;
}
</style>
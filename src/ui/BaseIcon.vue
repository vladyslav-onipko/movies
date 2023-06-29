<template>
    <div class="svg-wrapper" aria-hidden="true">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.svg-wrapper {
    height: 20px;
    width: 20px;

    svg {
        @include size(100%);
        fill: $color-black;
    }
}
</style>
<template>
    <div class="sort-bar">
        <base-button class="sort-bar__toggle">
            <base-icon class="sort-bar__toggle-icon" prefix="fas" iconName="arrow-up"></base-icon>
            <base-icon class="sort-bar__toggle-icon" prefix="fas" iconName="arrow-down"></base-icon>
            <span class="sort-bar__text">Sort</span>
        </base-button>
    </div>
</template>

<script>
export default {
    setup() {
        
    }
}
</script>

<style lang="scss" scoped>
.sort-bar {
    $this: &;

    color: $color-1--1;
    padding: 0 10px;
    width: 25%;

    &__toggle[class] {
        @include size(100%);
        align-items: center;
        border-radius: 4px;
        color: $color-1--1;
        display: flex;
        font-size: 1.25rem;
        justify-content: center;
        margin: 0;
        padding: 0.25em 0.5em;

        @include hover() {
            background-color: transparent;
            box-shadow: 0 0 15px 0 rgba($color-1--2,.75);
            color: inherit
        }

        #{$this}__toggle-icon {
            @include size(15px);
        }
    }

    &__text {
        margin-left: 5px;
    }
}
</style>
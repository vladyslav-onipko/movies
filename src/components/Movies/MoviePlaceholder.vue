<template>
    <div class="movie-placeholder">
        <base-icon prefix="fas" iconName="face-sad-tear" class="movie-placeholder__icon"></base-icon>
        <p class="movie-placeholder__text">{{ text }}</p>
    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>

<style lang="scss" scoped>
.movie-placeholder {
    align-items: center;
    color: $color-1--1;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;

    &__text {
        color: $color-1--1;
        font-size: 3rem;
        margin-top: 20px;
    }

    &__icon[class] {
        @include size(50px, 50px);
    }
}
</style>
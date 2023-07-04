<template>
    <div class="movie-placeholder">
        <base-icon prefix="fas" iconName="arrow-up"></base-icon>
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
        margin-top: 20px;
    }
}
</style>
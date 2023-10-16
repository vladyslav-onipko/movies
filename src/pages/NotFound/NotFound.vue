<template>
    <base-section class="page-error" :hiddenTitlte="true">
        <div class="page-error__content">
            <picture class="page-error__picture">
                <img class="page-error__image" src="../../assets/img/404.avif" alt="not found">
            </picture>
            <h2 class="page-error__title">404 - page not found</h2>
            <p class="page-error__text">The server could not locate the page you are looking for. This may be due to a broken link, outdated URL, or the page may have been removed or relocated.</p>
            <base-button class="page-error__link is-secondary" :link="true" to="/movies">Home</base-button>
        </div>
    </base-section>
</template>

<style lang="scss" scoped>
.page-error {
    &__content {
        text-align: center;
        padding: 20px 20px 40px;
    }

    &__picture {
        @include size(100%);
        display: block;
    }

    &__image {
        width: 60%;
    }

    &__title {
        color: $color-1--1;
        font-size: 4rem;
        margin-bottom: 25px;
        text-transform: uppercase;
    }

    &__text {
        margin-bottom: 25px;
    }

    &__link {
        text-transform: uppercase;
    }
}
</style>
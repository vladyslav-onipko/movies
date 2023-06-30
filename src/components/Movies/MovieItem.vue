<template>
    <li class="movie-item">
        <div class="movie-item__container">
            <div class="movie-item__picture">
                <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" alt="image">
            </div>
            <div class="movie-item__wrap">
                <div class="movie-item__content">
                    <h3 class="movie-item__title">title</h3>
                    <p class="movie-item__description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem dolore magnam aliquam quaerat voluptatem</p>
                </div>
                <div class="movie-item__actions">
                    <base-button>Remove</base-button>
                    <base-button :link="true" to="/" modifier="is-secondary">Details</base-button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['id', 'title', 'description']
}
</script>

<style lang="scss" scoped>
.movie-item {
    border-radius: 4px;
    box-shadow: 0 0 15px 0 rgba($color-1--2,.75);
    margin: 30px 0;
    padding: 30px 20px;
    
    &__container {
        display: flex;
    }

    &__picture {
        flex-shrink: 0;
        margin-right: 15px;
        width: 30%;
    }

    &__wrap {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-between;
    }

    &__title {
        color: $color-1--1;
        margin-bottom: 10px;
        text-transform: uppercase;
    }

    &__description {
        font-size: 1.6rem;
        margin-bottom: 10px;
    }

    &__actions {
        align-self: flex-end;
        margin-top: 15px;
    }
}
</style>
<template>
    <base-section class="movie" title="Movie" :hiddenTitle="true">
        <div class="movie__container">
            <div class="movie__actions is-top">
                <base-button 
                    class="movie__action is-only-icon is-favorite" 
                    :class="{ 'is-active': isFavorite }" 
                    title="favorite" 
                    @click="toggleFavoriteMovie">
                    <base-icon class="movie__action-icon" prefix="fas" iconName="heart"></base-icon>
                </base-button>
            </div>
            <div class="movie__wrapper">
                <div class="movie__picture">
                    <img :src="img" alt="image">
                </div>
                <div class="movie__content">
                    <h3 class="movie__title">{{ title }}</h3>
                    <p class="movie__rating">
                        <base-icon class="movie__rating-svg" prefix="fas" iconName="star"></base-icon>
                        <span class="movie__rating-number">{{ rating }}</span>
                    </p>
                    <div class="movie__info">
                        <span class="movie__info-rated">{{ rated }}</span>
                        <span class="movie__info-year">{{ movieYear }} year</span>
                        <span class="movie__info-runtime">{{ runtime }}</span>
                    </div>
                    <div class="movie__genres">
                        <span v-for="genre in movieGenres" :key="genre">{{ genre }}</span>
                    </div>
                    <p class="movie__description">{{ description }}</p>
                </div>
            </div>
            <div class="movie__actions is-bottom">
                <base-button class="movie__action is-only-icon is-back" :link="true" to="/movies">
                    <base-icon class="movie__action-icon" prefix="fas" iconName="arrow-left"></base-icon>
                    <span class="movie__action-text">back</span>
                </base-button>
            </div>
        </div>
    </base-section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';


export default {
  props: ['id', 'img', 'title', 'rating', 'rated', 'year', 'genres', 'runtime', 'description'],
  setup(props) {
    const store = useStore();
    const movies = store.getters.movies;
    const favoriteMovie = movies.find(movie => movie.id === props.id);

    const movieGenres = computed(() => props.genres.split(','));
    const movieYear = computed(() => parseInt(props.year));
    const isFavorite = computed(() => favoriteMovie.favorite);

    const toggleFavoriteMovie = () => {
        if (isFavorite.value) {
            favoriteMovie.favorite = false;
            store.commit('removeMovie', { from: 'favorites', id: props.id});
        } else {
            favoriteMovie.favorite = true;
            store.commit('addToFavorite', favoriteMovie);
        }
    }

    return { movieGenres, movieYear, isFavorite, toggleFavoriteMovie };
  }
}
</script>

<style lang="scss" scoped>
.movie {
    $this: &;

    &__container {
        padding: 30px 20px;
    }

    &__actions {
        display: flex;

        &.is-top {
            justify-content: flex-end;
            margin-bottom: 20px;
        }

        &.is-bottom {
            justify-content: flex-start;
            margin-top: 20px;
        }
    }

    &__action {
        #{$this}__action-icon[class] {
            @include size(25px);
        }

        &.is-favorite {
            @include transition;
            color: $color-gray;

            &.is-active {
                color: $color-1--2;
                transform: scale(1.5);
            }
        }

        &.is-back {
            align-items: center;
            display: flex;

            #{$this}__action-text {
                margin-left: 5px;
            }
        }
    }

    &__wrapper {
        display: flex;
    }

    &__picture {
        flex-shrink: 0;
        margin-right: 30px;
        width: 30%;
    }

    &__content {
        flex-grow: 1;
    }

    &__title {
        color: $color-1--1;
        font-size: 4rem;
        margin-bottom: 25px;
        text-align: center;
    }

    &__rating {
        align-items: center;
        color: $color-1--1;
        display: flex;
        justify-content: center;
        margin-bottom: 25px;

        &-number {
            font-size: 2.4rem;
            font-weight: 700;
            margin-left: 10px;
        }
    }

    &__rating-svg[class] {
        @include size(25px);
    }

    &__info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 25px;

        span {
            color: $color-gray;
            padding: 5px 10px;
        }
    }

    &__genres {
        display: flex;
        justify-content: space-around;
        margin-bottom: 25px;

        span {
            border: 1px solid $color-1--1;
            border-radius: 4px;
            color: $color-gray;
            min-width: 90px;
            padding: 10px;
            text-align: center;
        }
    }

    &__description {
        font-size: 2rem;
        margin-bottom: 15px;
    }
}
</style>
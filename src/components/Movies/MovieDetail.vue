<template>
    <base-section class="movie" title="Movie" :hiddenTitle="true">
        <div class="movie__container">
            <div class="movie__actions is-top">
                <base-button 
                    class="movie__action is-only-icon is-favorite" 
                    :class="{ 'is-active': isFavorite }" 
                    title="favorite" 
                    @click="toggleFavoriteMovie"
                    ref="toggle"
                    >
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
                <base-button class="movie__action is-only-icon is-back" :link="true" :to="linkBack">
                    <base-icon class="movie__action-icon" prefix="fas" iconName="arrow-left"></base-icon>
                    <span class="movie__action-text">back</span>
                </base-button>
            </div>
        </div>
    </base-section>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  props: [
    'id', 
    'img', 
    'title', 
    'rating', 
    'rated', 
    'year', 
    'genres', 
    'runtime', 
    'description', 
    'favorite'
    ],
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const movieGenres = computed(() => props.genres.split(','));
    const movieYear = computed(() => parseInt(props.year));
    const isFavorite = computed(() => props.favorite);
    const toggle = ref(null);
    const linkBack = router.options.history.state.back;
    
    const toggleFavoriteMovie = async () => {
        try {
            store.dispatch('updateFavorite', props.id);
            toggle.value.toggle.blur();
        } catch(e) {
            console.log(e);
        }
    }

    return { movieGenres, movieYear, isFavorite, linkBack, toggle, toggleFavoriteMovie };
  }
}
</script>

<style lang="scss" scoped>
.movie {
    $this: &;

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
            @include size(35px);
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

        @include media-max(767) {
            align-items: center;
            flex-direction: column;
        }
    }

    &__picture {
        flex-shrink: 0;
        margin-right: 30px;
        width: 40%;

        @include media-max(767) {
            margin: 0 0 20px;
        }

        @include media-max(479) {
            width: 100%;
        }
    }

    &__content {
        flex-grow: 1;
    }

    &__title {
        color: $color-1--1;
        font-size: 4rem;
        margin-bottom: 25px;
        text-align: center;

        @include media-max(767) {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
    }

    &__rating {
        align-items: center;
        color: $color-1--1;
        display: flex;
        justify-content: center;
        margin-bottom: 25px;

        @include media-max(767) {
            margin-bottom: 20px;
        }

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

        @include media-max(767) {
            margin-bottom: 20px;
        }

        span {
            color: $color-gray;
            padding: 5px 10px;
        }
    }

    &__genres {
        display: flex;
        justify-content: space-around;
        margin-bottom: 25px;

        @include media-max(767) {
            margin-bottom: 20px;
        }

        span {
            border: 1px solid $color-1--1;
            border-radius: 4px;
            color: $color-gray;
            min-width: 90px;
            padding: 10px;
            text-align: center;

            @include media-max(479) {
            min-width: 80px;
        }
        }
    }

    &__description {
        font-size: 2rem;
        margin-bottom: 15px;

        @include media-max(767) {
            text-align: center;
        }
    }
}
</style>
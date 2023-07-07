<template>
    <li class="movie-item">
        <div class="movie-item__container">
            <div class="movie-item__picture">
                <img :src="img" alt="image">
            </div>
            <div class="movie-item__wrap">
                <div class="movie-item__content">
                    <h3 class="movie-item__title">{{ title }}</h3>
                    <p class="movie-item__description">{{ description }}</p>
                </div>
                <div class="movie-item__actions">
                    <base-button @click="removeMovie">Remove</base-button>
                    <base-button :link="true" :to="detailLink" modifier="is-secondary">Details</base-button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    props: ['id', 'img', 'title', 'description'],
    setup(props) {
        const store = useStore();
        const route = useRoute();
        const detailLink = computed(() => '/movies' + '/' + props.id);
        const moviesArr = route.path.split('/').slice(-1)[0];

        const removeMovie = () => {
            store.commit('removeMovie', { from: moviesArr, id: props.id });
        }

        return { detailLink, removeMovie };
    }
}
</script>

<style lang="scss" scoped>
.movie-item {
    border-radius: 4px;
    border: 2px solid $color-1--2;
    padding: 30px 20px;

    &:not(:last-of-type) {
        margin-bottom: 30px;
    }
    
    &__container {
        display: flex;
    }

    &__picture {
        flex-shrink: 0;
        margin-right: 15px;
        height: 200px;
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
        margin-bottom: 10px;
    }

    &__actions {
        align-self: flex-end;
        margin-top: 15px;
    }
}
</style>
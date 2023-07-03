<template>
    <section class="search-bar">
        <h2 class="ghost">Search Bar</h2>
        <base-form :actions="true" @submit.prevent="submitForm">
            <base-input 
                label="Search" 
                id="search" 
                name="search" 
                placeholder="Start serching film.."
                v-model="movieName"
            ></base-input>
            <template v-slot:actions>
                <base-button type="submit">
                    <base-icon prefix="fas" iconName="search"></base-icon>
                </base-button>
            </template>
        </base-form>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

import BaseForm from '../../ui/BaseForm.vue';
import BaseInput from '../../ui/BaseInput.vue';
import BaseIcon from '../../ui/BaseIcon.vue';

export default {
    components: {
        BaseForm,
        BaseInput,
        BaseIcon,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const moviesURL = '/movies';
        const movieName = ref(null);

        const submitForm = () => {
            store.dispatch('saveMovie', { movie: movieName.value });
            
            if (route.path !== moviesURL) {
                router.push(movieName);
            }

            movieName.value = '';
        };

        return { movieName, submitForm }
    }
}
</script>

<style lang="scss">
.search-bar {
    margin: 50px 0;

    .form {
        align-items: center;
        display: flex;
    }

    .form-control {
        align-items: center;
        display: flex;
        flex-grow: 1;

        label {
            color: $color-1--2;
            font-size: 2.2rem;
            margin-right: 10px;
        }

        input {
            border: none;
            box-shadow: rgba($color-1--2, 0.1) 0px 4px 16px, rgba($color-1--2, 0.1) 0px 8px 24px, rgba($color-1--2, 0.1) 0px 16px 56px;
        }
    }

    .form-actions {
        .btn {
            border-radius: 4px;
            margin-right: 0;
        }
    }
}
</style>
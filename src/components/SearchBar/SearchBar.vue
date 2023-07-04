<template>
    <base-modal :show="!!error" title="An error ocuured!" @close="handleError">
        <p>{{ error }}</p>
    </base-modal>
    <section class="search-bar">
        <h2 class="ghost">Search Bar</h2>
        <base-form :actions="true" @submit.prevent="submitForm">
            <base-input 
                label="Search"
                id="search" 
                name="search" 
                placeholder="Start serching film.."
                v-model.trim="movieName"
            ></base-input>
            <transition name="fade" mode="out-in">
                <error-message v-if="!inputIsValid">field must not be empty</error-message>
            </transition>
            <template v-slot:actions>
                <base-button type="submit">
                    <base-icon prefix="fas" iconName="search"></base-icon>
                </base-button>
            </template>
        </base-form>
    </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

import BaseForm from '../../ui/BaseForm.vue';
import BaseInput from '../../ui/BaseInput.vue';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.vue';

export default {
    components: {
        BaseForm,
        BaseInput,
        ErrorMessage
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const movieName = ref(null);
        const inputIsValid = ref(true);
        const error = ref(null);

        const moviesURL = '/movies';

        const submitForm = async () => {
            if (!movieName.value) {
                inputIsValid.value = false;
                return;
            }

            try {
                await store.dispatch('saveMovie', { movie: movieName.value });
            } catch (e) {
                error.value = e.message || 'Something went wrong';
            }
            
            if (route.path !== moviesURL) {
                router.push(movieName);
            }

            movieName.value = '';
        };

        const handleError = () => {
            error.value = null;
        };

        watch(movieName, (newValue) => {
            if (newValue.length) {
                inputIsValid.value = true;
            }
        });

        return { movieName, submitForm, inputIsValid, error, handleError }
    }
}
</script>

<style lang="scss">
.search-bar {
    margin: 50px 0;

    .form {
        align-items: center;
        display: flex;

        .error-message {
            left: 80px;
        }
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
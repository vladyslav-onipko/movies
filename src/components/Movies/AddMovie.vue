<template>
    <base-modal :show="!!error" title="An error ocuured!" @close="handleError">
        <p>{{ error }}</p>
    </base-modal>
    <div class="search-bar">
        <base-spinner v-if="isLoading"></base-spinner>
        <base-form :actions="true" @submit.prevent="submitForm">
            <base-input 
                label="Movie"
                id="add" 
                placeholder="Start adding movie.."
                v-model.trim="movieName"
            ></base-input>
            <transition name="fade" mode="out-in">
                <error-message v-if="!inputIsValid">field must not be empty</error-message>
            </transition>
            <template v-slot:actions>
                <base-button type="submit" title="search">
                    <base-icon prefix="fas" icon-name="plus"></base-icon>
                </base-button>
            </template>
        </base-form>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

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

        const movieName = ref(null);
        const inputIsValid = ref(true);
        const error = ref(null);
        const isLoading = ref(false);
        const isAuth = computed(() => store.getters.isAuthenticated);

        const submitForm = async () => {
            if (!movieName.value) {
                inputIsValid.value = false;
                return;
            }

            isLoading.value = true;

            if (!isAuth.value) {
                router.push('login');
            }

            try {
                await store.dispatch('addMovie', movieName.value);
                movieName.value = '';
                router.push('/movies');
            } catch (e) {
                error.value = e.message || 'Something went wrong';
            }

            isLoading.value = false;
        };

        const handleError = () => {
            error.value = null;
        };

        watch(movieName, (newValue) => {
            if (newValue.length) {
                inputIsValid.value = true;
            }
        });

        return { movieName, submitForm, inputIsValid, error, handleError, isLoading }
    }
}
</script>

<style lang="scss">
.search-bar {
    margin-bottom:  50px;
    position: relative;

    .form {
        align-items: center;
        display: flex;

        .error-message {
            left: 75px;
        }
    }

    .form-control {
        align-items: center;
        display: flex;
        flex-grow: 1;
        margin-bottom: 0;

        label {
            color: $color-1--2;
            flex-shrink: 0;
            font-size: 2.2rem;
            font-weight: 700;
            margin: 0 10px 0 0;
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
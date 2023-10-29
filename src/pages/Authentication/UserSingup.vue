<template>
    <base-section class="auth" title="Login" :hiddenTitle="true">
        <base-modal :show="!!error" title="Failed to authenticate!" @close="handleError">
            <p>{{ error }}</p>
        </base-modal>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-form :actions="true" @submit.prevent="submitForm">
            <base-input
                label="Email"
                type="email"
                id="email"
                placeholder="enter email..."
                v-model.trim="emailInput"
            ></base-input>
            <base-input
                label="Password"
                type="password"
                id="password"
                placeholder="enter password..."
                v-model.trim="passwordInput"
            ></base-input>
            <transition name="fade" mode="out-in">
                <error-message v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters).</error-message>
            </transition>
            <template v-slot:actions>
                <base-button type="submit" class="is-secondary">Sing up</base-button>
            </template>
        </base-form>
    </base-section>
</template>

<script>
import BaseForm from '../../ui/BaseForm.vue';
import BaseInput from '../../ui/BaseInput.vue';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.vue';

import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
 
export default {
    components: {
        BaseForm,
        BaseInput,
        ErrorMessage
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const emailInput = ref('');
        const passwordInput = ref('');
        const formIsValid = ref(true);
        const error = ref(null);
        const isLoading = ref(false);

        const submitForm = async () => {
            if (!emailInput.value && !emailInput.value.includes('@') || passwordInput.value.length < 6) {
                formIsValid.value = false;
                return
            }

            const userData = {
                email: emailInput.value,
                password: passwordInput.value
            };

            isLoading.value = true;

            try {
                await store.dispatch('singup', userData);
                router.replace('/movies');
            } catch (e) {
                error.value = e.message || 'Something went wrong';
            }

            isLoading.value = false;
        };

        const handleError = () => {
            error.value = null;
        };

        watch([emailInput, passwordInput], ([emailValue, passwordValue]) => {
            if (emailValue.length || passwordValue.length) {
                formIsValid.value = true;
            }
        });

        return { emailInput, passwordInput, submitForm , formIsValid, isLoading, error, handleError };
    }
}
</script>
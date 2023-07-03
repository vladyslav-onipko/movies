<template>
    <div class="form-control">
        <label :for="id" :class="labelVisibility">{{ label }}</label>
        <input 
            :type="inputType" 
            :id="id" :name="id" 
            :placeholder="placeholder" 
            :value="modelValue" 
            @input="updateValue"
        >
    </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props: ['id', 'type', 'label', 'placeholder', 'modelValue'],
    emits: ['update:modelValue'],
    setup(props, context) {
        const inputType = computed(() => props.type ? props.type : 'text');
        const labelVisibility = computed(() => !props.label ? 'ghost': '' );

        const inputValue = ref(null);

        const updateValue = (e) => {
            context.emit('update:modelValue', e.target.value);
        }

        return { inputType, labelVisibility, inputValue, updateValue }
    }
}
</script>

<style lang="scss" scoped>
.form-control {
    label {
        color: $color-gray;
        cursor: pointer;
        display: block;
        font-size: 1.8rem;
    }

    input {
        background-color: $color-white;
        border: 1px solid $color-gray;
        border-radius: 4px;
        color: $color-gray;
        font-size: 1.6rem;
        margin: 0;
        min-height: 30px;
        overflow: hidden;
        padding: 0.81em 1.25em;
        width: 100%;

        &::placeholder {
            font-style: italic;
            font-size: 1.4rem;
        }

        &:focus {
            box-shadow: 0 0 6px 0 $color-1--2;
            outline: 1px solid rgba($color-1--2, 0.5);
            outline-offset: 0;
        }
    }
}
</style>
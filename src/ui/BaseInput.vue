<template>
    <div class="form-control">
        <label :for="id" :class="!hiddenLabel || 'ghost'">{{ label }}</label>
        <input
            :type="inputType" 
            :id="id"
            :name="id"
            :placeholder="placeholder" 
            :value="modelValue" 
            @input="updateValue"
            ref="input"
        >
    </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props: ['id', 'type', 'label', 'placeholder', 'modelValue', 'hiddenLabel'],
    emits: ['update:modelValue'],
    setup(props, context) {
        const input = ref(null);
        const inputType = computed(() => props.type ? props.type : 'text');

        const updateValue = (e) => {
            context.emit('update:modelValue', e.target.value);
        }

        return { inputType, updateValue, input };
    }
}
</script>

<style lang="scss" scoped>
.form-control {
    margin-bottom: 20px;
    
    label {
        color: $color-1--1;
        cursor: pointer;
        display: block;
        font-size: 1.8rem;
        margin-bottom: 5px;
    }

    input {
        background-color: $color-white;
        border: 1px solid $color-1--2;
        border-radius: 4px;
        color: $color-1--1;
        font-size: 1.6rem;
        margin: 0;
        min-height: 30px;
        overflow: hidden;
        padding: 0.81em 1.25em;
        width: 100%;

        &::placeholder {
            color: $color-1--1;
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
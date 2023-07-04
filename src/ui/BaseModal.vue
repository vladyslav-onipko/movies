<template>
  <teleport to="body">
    <div v-if="show" @click="hideModal" class="backdrop"></div>
    <transition name="modal">
        <base-section v-if="show" class="modal" title="Modal" :hiddenTitle="true">
            <div class="modal__title">
                <slot name="title">
                    <p class="modal__title-text">{{ title }}</p>
                </slot>
            </div>
            <div class="modal__message">
                <slot></slot>
            </div>
            <div v-if="!fixed" class="modal__actions">
                <slot name="actions">
                    <base-button @click="hideModal">Close</base-button>
                </slot>
            </div>
        </base-section>
    </transition>
  </teleport>
</template>

<script>
import BaseSection from './BaseSection.vue';
export default {
  components: { BaseSection },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, context) {
    const hideModal = () => {
      if (props.fixed) {
        return;
      }
      context.emit('close',);
    };

    return { hideModal }
  }
};
</script>

<style lang="scss" scoped>
.backdrop {
    @include size(100%, 100vh);
    background-color: rgba($color-black, 0.75);
    left: 0;
    position: fixed;
    top: 0;
    z-index: 10;
}

.modal {
    background-color: white;
    border: none;
    left: 25%;
    margin: 0;
    overflow: hidden;
    position: fixed;
    padding: 0;
    top: 20vh;
    width: 50%;
    z-index: 100;

  &__title {
        background-color: $color-1--2;
        padding: 1rem;

    &-text {
        color: $color-2--2;
        font-size: 4rem;
        margin: 0;
    }
  }

  &__message {
    padding: 1rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 1rem;
  }
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}
</style>
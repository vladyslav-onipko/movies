<template>
  <teleport to="body">
    <div v-if="show" @click="hideModal" class="backdrop" :aria-expanded="show"></div>
    <transition name="modal">
        <div v-if="show" class="modal" title="Modal" :hiddenTitle="true" aria-modal="true" role="dialog">
            <div class="modal__title">
                <slot name="title">
                    <p class="modal__title-text">{{ title }}</p>
                </slot>
            </div>
            <picture class="modal__picture">
              <img src="../assets/img/opps.jpg" alt="Something went wrong">
            </picture>
            <div class="modal__message" v-if="message">
                <slot></slot>
            </div>
            <div v-if="!fixed" class="modal__actions">
                <slot name="actions">
                    <base-button @click="hideModal">Got it</base-button>
                </slot>
            </div>
        </div>
    </transition>
  </teleport>
</template>

<script>
export default {
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
    message: {
      type: Boolean,
      required: false,
      default: true
    }
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
    text-align: center;
    top: 20vh;
    width: 50%;
    z-index: 100;

    @include media-max(1279) {
      left: 20%;
      width: 60%;
    }

    @include media-max(767) {
      left: 5%;
      width: 90%;
    }

  &__title {
        background-color: $color-1--2;
        padding: 1rem;

    &-text {
        color: $color-2--2;
        font-size: 4rem;
        margin: 0;

        @include media-max(767) {
          font-size: 3rem;
        }
    }
  }

  &__picture {
    display: block;
    margin: 0 auto;
    width: 50%;

    @include media-max(479) {
      width: 100%;
    }
  }

  &__message {
    padding: 1rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 10px 20px 20px;

    @include media-max(1279) {
      justify-content: center;
    }
  }
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}
</style>
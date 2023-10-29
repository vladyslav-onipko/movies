<template>
    <div class="site-wrapper">
      <div class="site-wrapper__header">
        <the-header></the-header>
      </div>
      <div class="site-wrapper__main">
        <main class="site-content" role="main">
          <base-modal :show="!!error" title="An error ocuured!" @close="handleError">
            <p>{{ error }}</p>
          </base-modal>
          <base-spinner v-if="isLoading"></base-spinner>
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path"></component>
            </transition>
          </router-view>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import TheHeader from '../layout/TheHeader.vue'
  
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  
  export default {
    name: 'SiteMain',
    components: {
      TheHeader
    },
    async setup() {
      const store = useStore();

      const isLoading = ref(false);
      const error = ref(null);

      const handleError = () => {
        error.value = null;
      };

      store.dispatch('autoLogin');

      isLoading.value = true;

      try {
        await store.dispatch('loadMovies');
      } catch (e) {
        error.value = e.message || 'Something went wrong';
      }

      isLoading.value = false;

      return { isLoading, error, handleError };
    }
  }
  </script>
  
  <style lang="scss">
  @import '../scss/base';
  @import '../scss/animations';
  
  .site-wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
      min-height: 100vh;
      overflow-x: hidden;
      width: 100%;
  
      &__main {
        height: 100%;
      }
  }
  
  .site-content {
      margin: 0 auto;
      max-width: 768px;
      padding: 0 20px;
      position: relative;
  }
  </style>
  
<template>
  <div class="site-wrapper">
    <div class="site-wrapper__header">
      <the-header></the-header>
    </div>
    <div class="site-wrapper__main">
      <main class="site-content" role="main">
        <search-bar></search-bar>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import TheHeader from './layout/TheHeader.vue'
import SearchBar from './components/SearchBar/SearchBar.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    SearchBar,
  }
}
</script>

<style lang="scss">
@import './scss/base';

.site-content {
    margin: 0 auto;
    max-width: 768px;
    padding: 0 20px;
    width: 100%;
}
</style>

<template>
  <suspense>
    <the-main></the-main>
  </suspense>
</template>

<script>
import TheMain from './base/TheMain.vue';

export default {
  name: 'App',
  components: {
    TheMain
  }
}
</script>
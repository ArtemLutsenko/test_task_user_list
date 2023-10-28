<template>
  <div class="container">
    <div class="not-found">
      <h2>404 - Page Not Found</h2>
      <router-link to="/" class="not-found__link">Go Back Home</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NotFound'
});
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  height: 100vh;

  &__link {
    font-size: 24px;
  }
}

</style>

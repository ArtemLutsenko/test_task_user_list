<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";

</script>

<template>
  <div class="common-layout">
    <app-header/>

    <el-main>
      <RouterView/>
    </el-main>
  </div>
</template>

<style scoped>

</style>

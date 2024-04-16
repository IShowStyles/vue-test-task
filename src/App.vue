<script setup lang="ts">
import {RouterView} from 'vue-router'
import BaseHeader from "./components/BaseHeader.vue";
import BaseFooter from "./components/BaseFooter.vue";
</script>

<template>
  <el-config-provider>
    <base-header/>
    <main class='main'>
      <router-view/>
    </main>
    <base-footer/>
  </el-config-provider>
</template>

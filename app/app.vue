<script setup lang="ts">
useImageProtection()
</script>

<template>
  <UApp>
    <AmbientGlow />
    <div class="noise" aria-hidden="true" />
    <ScrollProgress />
    <NuxtPage />
    <CustomCursor />
  </UApp>
</template>

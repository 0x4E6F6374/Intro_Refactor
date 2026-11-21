<script setup lang="ts">
const props = defineProps<{
  text: string
  punctuation?: string
  startDelay?: number
}>()

const chars = computed(() => Array.from(props.text))
const base = computed(() => props.startDelay ?? 0)
</script>

<template>
  <span class="inline-block">
    <span
      v-for="(char, i) in chars"
      :key="i"
      class="reveal inline-block"
      :style="{ animationDelay: `${base + i * 0.045}s` }"
    >{{ char }}</span>
    <span
      v-if="punctuation"
      class="reveal inline-block text-accent"
      :style="{ animationDelay: `${base + chars.length * 0.045}s` }"
    >{{ punctuation }}</span>
  </span>
</template>

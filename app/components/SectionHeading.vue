<script setup lang="ts">
defineProps<{
  index: string
  code: string
  title: string
  accent?: string
  note?: string
}>()
</script>

<template>
  <div class="reveal mb-14">
    <div class="flex items-start gap-5 sm:gap-8">
      <span
        class="serif leading-none text-[clamp(3rem,7vw,5.5rem)] font-light tracking-tight opacity-90"
        :style="{ color: 'var(--line-strong)', userSelect: 'none' }"
      >
        {{ index }}
      </span>
      <div class="pt-2 flex-1">
        <div class="flex items-center gap-3">
          <span class="h-px w-8 bg-[var(--accent)]" />
          <span class="label">// {{ code }}</span>
        </div>
        <h2
          class="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
          :style="{ color: 'var(--ink)' }"
        >
          {{ title }}<span class="text-accent">{{ accent ?? '.' }}</span>
        </h2>
        <p v-if="note" class="mt-4 max-w-md text-sm leading-relaxed" :style="{ color: 'var(--ink-soft)' }">
          {{ note }}
        </p>
      </div>
    </div>
    <div class="draw-line mt-10 h-px w-full" :style="{ background: 'var(--line)' }" />
  </div>
</template>

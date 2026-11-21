<script setup lang="ts">
defineProps<{
  label: string
  icon: string
  url?: string
}>()

const { el, style } = useMagnetic(0.28)
</script>

<template>
  <a
    ref="el"
    :href="url"
    :target="url ? '_blank' : undefined"
    rel="noopener"
    class="group relative grid size-11 place-items-center rounded-full border transition-colors duration-300"
    :style="[
      style,
      {
        borderColor: 'var(--line)',
        color: 'var(--ink-soft)',
        background: 'var(--surface)',
        cursor: url ? 'pointer' : 'default'
      }
    ]"
    :class="url ? 'hover:border-[var(--accent)] hover:text-[var(--accent)]' : ''"
    :aria-label="label"
    :title="label"
    :data-cursor="url ? 'link' : undefined"
  >
    <UIcon :name="icon" class="size-[18px] transition-transform duration-300 group-hover:scale-110" />
  </a>
</template>

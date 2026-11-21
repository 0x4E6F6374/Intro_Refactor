<script setup lang="ts">
const colorMode = useColorMode()

const options = [
  { value: 'system', label: '跟随系统', icon: 'i-lucide-monitor' },
  { value: 'light', label: '浅色', icon: 'i-lucide-sun' },
  { value: 'dark', label: '深色', icon: 'i-lucide-moon' }
]

const current = computed(() =>
  options.find((item) => item.value === colorMode.preference) ?? options[0]!
)
</script>

<template>
  <UDropdownMenu
    :items="[[
      ...options.map((item) => ({
        label: item.label,
        icon: item.icon,
        onSelect: () => { colorMode.preference = item.value }
      }))
    ]]"
    :content="{ align: 'end', sideOffset: 10 }"
  >
    <button
      type="button"
      class="group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors"
      :style="{ borderColor: 'var(--line)', color: 'var(--ink-soft)' }"
      :aria-label="`主题：${current.label}`"
    >
      <UIcon :name="current.icon" class="size-4" />
      <span class="mono hidden text-[10px] tracking-[0.14em] sm:inline">{{ current.label }}</span>
    </button>
  </UDropdownMenu>
</template>

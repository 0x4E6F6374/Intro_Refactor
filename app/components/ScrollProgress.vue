<script setup lang="ts">
const progress = ref(0)

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? (window.scrollY / max) * 100 : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[70] h-0.5" :style="{ background: 'var(--line)' }">
    <div
      class="h-full origin-left bg-[var(--accent)]"
      :style="{ width: `${progress}%`, boxShadow: '0 0 12px var(--accent)' }"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ to: number, duration?: number }>()

const display = ref(0)
const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const run = () => {
  const start = performance.now()
  const end = props.duration ?? 1200
  const tick = (now: number) => {
    const p = Math.min((now - start) / end, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    display.value = Math.round(props.to * eased)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        run()
        observer?.disconnect()
      }
    },
    { threshold: 0.6 }
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span ref="el" class="tabular-nums">{{ display }}</span>
</template>

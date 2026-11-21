<script setup lang="ts">
const pos = reactive({ x: 50, y: 30 })
const target = reactive({ x: 50, y: 30 })
let raf = 0

const onMove = (event: PointerEvent) => {
  target.x = (event.clientX / window.innerWidth) * 100
  target.y = (event.clientY / window.innerHeight) * 100
}

const loop = () => {
  pos.x += (target.x - pos.x) * 0.04
  pos.y += (target.y - pos.y) * 0.04
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  window.addEventListener('pointermove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-0"
    :style="{
      background: `radial-gradient(ellipse 35% 30% at ${pos.x}% ${pos.y}%, var(--glow), transparent 70%)`
    }"
  />
</template>

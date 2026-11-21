<script setup lang="ts">
const enabled = ref(false)
const visible = ref(false)
const active = ref(false)
const pos = reactive({ x: 0, y: 0 })
const ring = reactive({ x: 0, y: 0 })

const onMove = (event: PointerEvent) => {
  pos.x = event.clientX
  pos.y = event.clientY
  visible.value = true

  const target = event.target as HTMLElement | null
  active.value = !!target?.closest('a, button, [data-cursor]')
}

let raf = 0
const loop = () => {
  ring.x += (pos.x - ring.x) * 0.18
  ring.y += (pos.y - ring.y) * 0.18
  raf = requestAnimationFrame(loop)
}

const onLeave = () => { visible.value = false }

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  enabled.value = true
  ring.x = window.innerWidth / 2
  ring.y = window.innerHeight / 2
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <template v-if="enabled">
    <div
      class="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border"
      :style="{
        width: active ? '48px' : '30px',
        height: active ? '48px' : '30px',
        borderColor: active ? 'var(--accent)' : 'var(--line-strong)',
        transform: `translate(${ring.x - (active ? 24 : 15)}px, ${ring.y - (active ? 24 : 15)}px)`,
        opacity: visible ? 1 : 0,
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease'
      }"
    />
    <div
      class="pointer-events-none fixed left-0 top-0 z-[81] size-1 rounded-full bg-[var(--accent)]"
      :style="{
        transform: `translate(${pos.x - 2}px, ${pos.y - 2}px)`,
        opacity: visible && !active ? 1 : 0,
        transition: 'opacity 0.2s ease'
      }"
    />
  </template>
</template>

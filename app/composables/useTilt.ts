export function useTilt(max = 8) {
  const el = ref<HTMLElement | null>(null)
  const rotate = reactive({ x: 0, y: 0 })
  const glow = reactive({ x: 50, y: 50 })
  const hovered = ref(false)

  const onMove = (event: PointerEvent) => {
    if (!el.value) return
    const rect = el.value.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotate.y = (px - 0.5) * max * 2
    rotate.x = -(py - 0.5) * max * 2
    glow.x = px * 100
    glow.y = py * 100
  }

  const onLeave = () => {
    rotate.x = 0
    rotate.y = 0
    hovered.value = false
  }

  const onEnter = () => {
    hovered.value = true
  }

  onMounted(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    el.value?.addEventListener('pointerenter', onEnter)
    el.value?.addEventListener('pointermove', onMove)
    el.value?.addEventListener('pointerleave', onLeave)
  })

  onBeforeUnmount(() => {
    el.value?.removeEventListener('pointerenter', onEnter)
    el.value?.removeEventListener('pointermove', onMove)
    el.value?.removeEventListener('pointerleave', onLeave)
  })

  return {
    el,
    hovered,
    transform: computed(() =>
      `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
    ),
    glowStyle: computed(() => ({
      background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, var(--glow), transparent 55%)`,
      opacity: hovered.value ? 1 : 0
    }))
  }
}

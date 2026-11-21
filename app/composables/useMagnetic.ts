export function useMagnetic(strength = 0.25) {
  const el = ref<HTMLElement | null>(null)
  const offset = reactive({ x: 0, y: 0 })
  const moving = ref(false)

  const onMove = (event: PointerEvent) => {
    if (!el.value) return
    const rect = el.value.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    offset.x = (event.clientX - cx) * strength
    offset.y = (event.clientY - cy) * strength
    moving.value = true
  }

  const onLeave = () => {
    offset.x = 0
    offset.y = 0
    moving.value = false
  }

  onMounted(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    el.value?.addEventListener('pointermove', onMove)
    el.value?.addEventListener('pointerleave', onLeave)
  })

  onBeforeUnmount(() => {
    el.value?.removeEventListener('pointermove', onMove)
    el.value?.removeEventListener('pointerleave', onLeave)
  })

  return {
    el,
    style: computed(() => ({
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: moving.value ? 'transform 0.1s ease-out' : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
    }))
  }
}

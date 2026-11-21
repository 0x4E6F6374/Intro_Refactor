export function useParallax(speed = 0.15) {
  const el = ref<HTMLElement | null>(null)
  let raf = 0
  let ticking = false

  const update = () => {
    if (!el.value) return
    const rect = el.value.parentElement?.getBoundingClientRect()
    if (!rect) return
    const offset = -rect.top * speed
    el.value.style.transform = `translate3d(0, ${offset}px, 0)`
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    raf = requestAnimationFrame(update)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(raf)
  })

  return { el }
}

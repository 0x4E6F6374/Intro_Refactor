export function useImageProtection() {
  const isProtected = (target: EventTarget | null) =>
    target instanceof Element && !!target.closest('[data-protected]')

  const onContextMenu = (event: MouseEvent) => {
    if (isProtected(event.target)) event.preventDefault()
  }

  const onDragStart = (event: DragEvent) => {
    if (isProtected(event.target)) event.preventDefault()
  }

  const onSelectStart = (event: Event) => {
    if (isProtected(event.target)) event.preventDefault()
  }

  onMounted(() => {
    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('dragstart', onDragStart)
    document.addEventListener('selectstart', onSelectStart)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('contextmenu', onContextMenu)
    document.removeEventListener('dragstart', onDragStart)
    document.removeEventListener('selectstart', onSelectStart)
  })
}

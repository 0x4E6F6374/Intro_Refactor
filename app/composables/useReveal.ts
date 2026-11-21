export function useReveal() {
  let observer: IntersectionObserver | null = null

  const register = (el: HTMLElement) => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
    }
    observer.observe(el)
  }

  onMounted(() => {
    document.querySelectorAll<HTMLElement>('.reveal').forEach(register)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}

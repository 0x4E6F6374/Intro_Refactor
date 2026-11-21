<script setup lang="ts">
defineProps<{
  github: string
  monogram?: string
  handle?: string
}>()

const links = [
  { label: '项目', href: '#projects', index: '01' },
  { label: '历程', href: '#timeline', index: '02' },
  { label: '关于', href: '#about', index: '03' },
  { label: '联系', href: '#contact', index: '04' }
]

const scrolled = ref(false)
const active = ref('')

const onScroll = () => {
  scrolled.value = window.scrollY > 24

  const ids = ['projects', 'timeline', 'about', 'contact']
  let current = ''
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= 160) current = `#${id}`
  }
  active.value = current
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'backdrop-blur-xl' : ''"
    :style="{
      background: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`
    }"
  >
    <div class="shell flex h-18 items-center justify-between">
      <a href="#top" class="group flex items-center gap-3" aria-label="返回顶部">
        <span
          class="relative grid size-8 place-items-center rounded-sm border transition-colors group-hover:border-[var(--accent)]"
          :style="{ borderColor: 'var(--line-strong)' }"
        >
          <span class="text-accent mono text-sm font-semibold">{{ monogram ?? 'W' }}</span>
          <span class="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-emerald-400" />
        </span>
        <span class="mono text-xs tracking-[0.2em]" :style="{ color: 'var(--ink-soft)' }">{{ handle ?? 'WMING' }}</span>
      </a>

      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="group mono relative flex items-baseline gap-1.5 py-2 text-[11px] tracking-[0.12em] transition-colors"
          :style="{ color: active === link.href ? 'var(--ink)' : 'var(--ink-faint)' }"
        >
          <span
            class="text-[9px] transition-opacity"
            :class="active === link.href ? 'text-accent opacity-100' : 'text-accent opacity-40'"
          >{{ link.index }}</span>
          <span>{{ link.label }}</span>
          <span
            class="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--accent)] transition-transform duration-300"
            :style="{ transform: active === link.href ? 'scaleX(1)' : 'scaleX(0)' }"
          />
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="github"
          target="_blank"
          rel="noopener"
          class="hidden transition-opacity hover:opacity-70 sm:block"
          :style="{ color: 'var(--ink-soft)' }"
          aria-label="GitHub"
        >
          <UIcon name="i-simple-icons-github" class="size-4" />
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  avatars: string[]
  name: string
  active: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ cycle: [] }>()

const canvas = ref<HTMLCanvasElement | null>(null)
let observer: ResizeObserver | null = null
const loaded = ref(false)

const draw = () => {
  const el = canvas.value
  const src = props.avatars[props.active]
  if (!el || !src) return

  const rect = el.getBoundingClientRect()
  const size = Math.min(rect.width, rect.height)
  if (!size) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const pixels = Math.round(size * dpr)
  if (el.width !== pixels || el.height !== pixels) {
    el.width = pixels
    el.height = pixels
  }

  const image = new Image()
  image.onload = () => {
    const ctx = el.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, pixels, pixels)

    const scale = Math.max(pixels / image.width, pixels / image.height)
    const w = image.width * scale
    const h = image.height * scale
    ctx.drawImage(image, (pixels - w) / 2, (pixels - h) / 2, w, h)
    loaded.value = true
  }
  image.src = src
}

watch(() => [props.active, props.avatars] as const, () => {
  loaded.value = false
  draw()
})

onMounted(() => {
  draw()
  if (canvas.value) {
    observer = new ResizeObserver(() => draw())
    observer.observe(canvas.value)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div data-protected class="relative size-full select-none overflow-hidden" @contextmenu.prevent @dragstart.prevent>
    <canvas
      ref="canvas"
      class="absolute inset-0 size-full object-cover transition-opacity duration-700"
      :class="loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
      :aria-label="`${name} 的头像 ${active + 1}`"
      role="img"
    />

    <div class="pointer-events-none absolute inset-0 opacity-30" :style="{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, var(--bg) 4px)' }" />

    <button
      type="button"
      class="group absolute inset-0 grid place-items-end pb-3"
      :aria-label="`切换头像，当前第 ${active + 1} 张`"
      @click="emit('cycle')"
    >
      <span
        class="flex items-center justify-center gap-2 py-1 text-[10px] tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        :style="{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)', color: 'var(--ink-soft)' }"
      >
        <UIcon name="i-lucide-refresh-cw" class="size-3" />
        CLICK TO SWITCH
      </span>
    </button>

    <div class="pointer-events-none absolute inset-0" aria-hidden="true" />
  </div>
</template>

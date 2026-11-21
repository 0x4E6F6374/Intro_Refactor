<script setup lang="ts">
defineProps<{ name: string }>()

const done = ref(false)
const leaving = ref(false)
const progress = ref(0)

onMounted(() => {
  if (sessionStorage.getItem('intro-loaded')) {
    done.value = true
    return
  }

  const start = performance.now()
  const duration = 900
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1)
    progress.value = Math.round(p * 100)
    if (p < 1) {
      requestAnimationFrame(tick)
    } else {
      leaving.value = true
      sessionStorage.setItem('intro-loaded', '1')
      setTimeout(() => { done.value = true }, 700)
    }
  }
  requestAnimationFrame(tick)
})
</script>

<template>
  <Transition name="loader">
    <div
      v-if="!done"
      class="fixed inset-0 z-[90] flex flex-col items-center justify-center"
      :class="leaving ? '-translate-y-full' : 'translate-y-0'"
      :style="{
        background: 'var(--bg)',
        transition: leaving ? 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)' : 'none'
      }"
    >
      <span class="mono absolute left-8 top-8 text-[10px] tracking-[0.2em]" :style="{ color: 'var(--ink-faint)' }">
        INITIALIZING
      </span>
      <span class="mono absolute right-8 top-8 text-[10px] tracking-[0.2em]" :style="{ color: 'var(--ink-faint)' }">
        {{ String(progress).padStart(3, '0') }}%
      </span>

      <div class="serif text-[clamp(3rem,10vw,7rem)] font-light leading-none tracking-tight" :style="{ color: 'var(--ink)' }">
        {{ name }}
      </div>
      <div class="mt-8 h-px w-56 overflow-hidden" :style="{ background: 'var(--line)' }">
        <div class="h-full origin-left bg-[var(--accent)]" :style="{ width: `${progress}%` }" />
      </div>
      <span class="mono mt-4 text-[9px] tracking-[0.3em]" :style="{ color: 'var(--ink-faint)' }">
        LOADING PORTFOLIO
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.loader-leave-active { position: fixed; }
</style>

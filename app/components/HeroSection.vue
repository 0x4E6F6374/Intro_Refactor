<script setup lang="ts">
interface Social {
  label: string
  icon: string
  url?: string
}

const props = defineProps<{
  name: string
  identity: string
  headline: string
  subtitle: string
  location: string
  avatars: string[]
  socials: Social[]
}>()

const activeAvatar = ref(0)

const headlineParts = computed(() => {
  const text = props.headline
  const punctuation = text.match(/[.。]$/)?.[0] ?? ''
  return {
    body: punctuation ? text.slice(0, -punctuation.length) : text,
    punctuation
  }
})

onMounted(() => {
  activeAvatar.value = Math.floor(Math.random() * props.avatars.length)
})

const cycleAvatar = () => {
  activeAvatar.value = (activeAvatar.value + 1) % props.avatars.length
}
</script>

<template>
  <section id="top" class="relative min-h-svh overflow-hidden">
    <div class="pointer-events-none absolute inset-0">
      <Scene3D />
    </div>
    <div class="grid-bg pointer-events-none absolute inset-0" />
    <div
      class="pointer-events-none absolute inset-0"
      :style="{ background: `radial-gradient(ellipse 60% 50% at 78% 45%, var(--glow), transparent 70%)` }"
    />

    <div class="shell relative z-10 flex min-h-svh flex-col justify-center pt-28 pb-20">
      <div class="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div class="reveal mb-10 flex items-center gap-4">
            <span class="h-px w-14 bg-[var(--accent)] draw-line" />
            <span class="label">PORTFOLIO — 2026</span>
          </div>

          <p class="mono reveal mb-5 text-xs tracking-[0.26em]" :style="{ color: 'var(--accent)', animationDelay: '0.05s' }">
            {{ identity }}
          </p>

          <h1
            class="reveal max-w-[14ch] font-semibold leading-[1.06] tracking-[-0.05em] text-[clamp(2.8rem,7vw,5.6rem)]"
            :style="{ color: 'var(--ink)', animationDelay: '0.1s' }"
          >
            {{ headlineParts.body }}<span class="text-accent">{{ headlineParts.punctuation }}</span>
          </h1>

          <p
            class="reveal mt-8 max-w-lg text-base leading-relaxed sm:text-[1.05rem]"
            :style="{ color: 'var(--ink-soft)', animationDelay: '0.18s' }"
          >
            {{ subtitle }}
          </p>

          <div class="reveal mt-8 flex flex-wrap items-center gap-x-7 gap-y-3" :style="{ animationDelay: '0.24s' }">
            <span class="mono flex items-center gap-2 text-xs" :style="{ color: 'var(--ink-faint)' }">
              <UIcon name="i-lucide-map-pin" class="size-3.5 text-accent" />
              {{ location }}
            </span>
            <span class="h-3 w-px bg-[var(--line-strong)]" />
            <span class="mono flex items-center gap-2 text-xs" :style="{ color: 'var(--ink-faint)' }">
              <span class="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              AVAILABLE FOR WORK
            </span>
          </div>

          <div class="reveal mt-11 flex items-center gap-3" :style="{ animationDelay: '0.3s' }">
            <a
              v-for="(social, index) in socials"
              :key="social.label"
              :href="social.url"
              :target="social.url ? '_blank' : undefined"
              rel="noopener"
              class="group relative grid size-11 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-1"
              :style="{
                borderColor: 'var(--line)',
                color: 'var(--ink-soft)',
                background: 'var(--surface)',
                cursor: social.url ? 'pointer' : 'default',
                animationDelay: `${0.32 + index * 0.05}s`
              }"
              :class="social.url ? 'hover:border-[var(--accent)] hover:text-[var(--accent)]' : ''"
              :aria-label="social.label"
              :title="social.label"
            >
              <UIcon :name="social.icon" class="size-[18px] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
        </div>

        <div class="reveal relative flex justify-center lg:justify-end" style="animation-delay: 0.16s">
          <div class="relative w-64 sm:w-80 lg:w-[22rem]">
            <div
              class="absolute -inset-10 rounded-full blur-3xl"
              :style="{ background: 'var(--glow)' }"
            />

            <div class="corner relative aspect-square w-full">
              <button
                type="button"
                class="group relative block size-full overflow-hidden"
                :style="{ border: '1px solid var(--line-strong)' }"
                :aria-label="`切换头像，当前第 ${activeAvatar + 1} 张`"
                @click="cycleAvatar"
              >
                <img
                  v-for="(avatar, index) in avatars"
                  :key="avatar"
                  :src="avatar"
                  :alt="`${name} 的头像 ${index + 1}`"
                  class="absolute inset-0 size-full object-cover transition-all duration-700"
                  :class="index === activeAvatar ? 'scale-100 opacity-100' : 'scale-105 opacity-0'"
                />
                <div
                  class="pointer-events-none absolute inset-0 opacity-30"
                  :style="{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, var(--bg) 4px)' }"
                />
                <span
                  class="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  :style="{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)', color: 'var(--ink-soft)' }"
                >
                  <UIcon name="i-lucide-refresh-cw" class="size-3" />
                  CLICK TO SWITCH
                </span>
              </button>

              <span class="mono absolute -left-3 top-4 -translate-x-full text-[10px] tracking-widest" :style="{ color: 'var(--ink-faint)', writingMode: 'vertical-rl' }">
                ID / {{ String(activeAvatar + 1).padStart(2, '0') }}
              </span>
            </div>

            <div class="mono mt-6 flex items-center justify-between text-[10px] tracking-widest" :style="{ color: 'var(--ink-faint)' }">
              <span class="flex items-center gap-2">
                <span class="text-accent">{{ String(activeAvatar + 1).padStart(2, '0') }}</span>
                <span class="h-px w-10 bg-[var(--line-strong)]" />
                {{ String(avatars.length).padStart(2, '0') }}
              </span>
              <span>ARCHIVE / {{ name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span class="mono text-[9px] tracking-[0.3em]" :style="{ color: 'var(--ink-faint)' }">SCROLL</span>
        <span class="relative h-10 w-px overflow-hidden" :style="{ background: 'var(--line)' }">
          <span class="absolute inset-x-0 top-0 h-4 animate-[float-y_2s_ease-in-out_infinite] bg-[var(--accent)]" />
        </span>
      </div>
    </div>
  </section>
</template>

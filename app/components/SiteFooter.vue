<script setup lang="ts">
interface SocialLink {
  label: string
  icon: string
  url?: string
}

defineProps<{
  name: string
  emails: string[]
  socials: SocialLink[]
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="relative scroll-mt-20 border-t" :style="{ borderColor: 'var(--line)' }">
    <div class="shell py-24">
      <div class="reveal grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div class="mb-6 flex items-center gap-3">
            <span class="h-px w-10 bg-[var(--accent)]" />
            <span class="label">GET IN TOUCH — 04</span>
          </div>

          <h2
            class="text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-tight tracking-[-0.04em]"
            :style="{ color: 'var(--ink)' }"
          >
            保持<span class="text-accent serif italic">联系</span>.
          </h2>
          <p class="mt-6 max-w-md text-sm leading-relaxed" :style="{ color: 'var(--ink-soft)' }">
            有想法、项目或只是想聊聊，随时找我。
          </p>

          <div class="mt-9 flex flex-col gap-3">
            <a
              v-for="email in emails"
              :key="email"
              :href="`mailto:${email}`"
              class="group inline-flex w-fit items-center gap-3 border-b pb-1.5 text-sm transition-colors"
              :style="{ borderColor: 'var(--line)', color: 'var(--ink)' }"
            >
              <UIcon name="i-lucide-mail" class="size-4 text-accent" />
              <span class="mono transition-colors group-hover:text-[var(--accent)]">{{ email }}</span>
              <UIcon name="i-lucide-arrow-up-right" class="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </div>

          <div class="mt-9 flex flex-wrap gap-2">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.url"
              :target="social.url ? '_blank' : undefined"
              rel="noopener"
              class="group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all hover:-translate-y-0.5"
              :style="{ borderColor: 'var(--line)', color: 'var(--ink-soft)', background: 'var(--surface)' }"
              :class="social.url ? 'hover:border-[var(--accent)] hover:text-[var(--accent)]' : ''"
              :aria-label="social.label"
            >
              <UIcon :name="social.icon" class="size-3.5" />
              <span class="mono text-[10px] tracking-wider">{{ social.label }}</span>
            </a>
          </div>
        </div>

        <div class="hidden text-left lg:block lg:text-right">
          <p class="serif text-[clamp(4rem,9vw,8rem)] font-light leading-none tracking-tight" :style="{ color: 'var(--line-strong)' }">
            {{ name }}
          </p>
        </div>
      </div>

      <div class="draw-line mt-14 h-px w-full" :style="{ background: 'var(--line)' }" />
      <div class="mono mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] tracking-wider" :style="{ color: 'var(--ink-faint)' }">
        <span>© {{ year }} {{ name }}. ALL RIGHTS RESERVED.</span>
        <span class="flex items-center gap-2">
          BUILT WITH NUXT · TRESJS
          <span class="size-1 animate-pulse rounded-full bg-emerald-400" />
        </span>
      </div>
    </div>
  </footer>
</template>

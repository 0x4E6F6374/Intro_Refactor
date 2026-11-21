<script setup lang="ts">
interface SkillGroup {
  category: string
  items: string[]
}
interface Extra {
  label: string
  value: string
}

defineProps<{
  skills: SkillGroup[]
  extras: Extra[]
}>()

const extraIcons = ['i-lucide-gamepad-2', 'i-lucide-server']
</script>

<template>
  <section id="about" class="relative scroll-mt-20 py-28">
    <div class="shell">
      <SectionHeading index="03" code="ABOUT" title="关于" note="工具箱与日常，构成现在的我。" />

      <div class="grid gap-5 lg:grid-cols-2">
        <div
          v-for="(group, index) in skills"
          :key="group.category"
          class="reveal group relative overflow-hidden rounded-lg border p-7"
          :style="{ borderColor: 'var(--line)', background: 'var(--surface)', animationDelay: `${index * 0.1}s` }"
        >
          <div class="absolute right-0 top-0 h-20 w-20 opacity-[0.06]" :style="{ background: 'radial-gradient(circle at top right, var(--accent), transparent 70%)' }" />

          <div class="mb-7 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="serif text-2xl font-light" :style="{ color: 'var(--accent)' }">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3 class="mono text-xs tracking-[0.16em]" :style="{ color: 'var(--ink)' }">{{ group.category }}</h3>
            </div>
            <span class="mono text-[10px]" :style="{ color: 'var(--ink-faint)' }">
              <CountUp :to="group.items.length" /> STACK
            </span>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="(item, i) in group.items"
              :key="item"
              class="group/tag relative rounded border px-3 py-1.5 text-sm transition-all duration-300 hover:-translate-y-0.5"
              :style="{ borderColor: 'var(--line)', color: 'var(--ink)' }"
            >
              <span class="mono mr-2 text-[10px] transition-colors group-hover/tag:text-[var(--accent)]" :style="{ color: 'var(--ink-faint)' }">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              {{ item }}
            </span>
          </div>

          <div class="mt-7 flex gap-1">
            <span
              v-for="(_, i) in group.items"
              :key="i"
              class="h-0.5 flex-1 origin-left"
              :style="{
                background: i === 0 ? 'var(--accent)' : 'var(--line)',
                transform: 'scaleX(1)',
                opacity: 0.4 + (i / Math.max(group.items.length - 1, 1)) * 0.6
              }"
            />
          </div>
        </div>
      </div>

      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <div
          v-for="(extra, index) in extras"
          :key="extra.label"
          class="reveal flex items-center gap-5 rounded-lg border p-6"
          :style="{ borderColor: 'var(--line)', background: 'var(--surface)', animationDelay: `${0.2 + index * 0.08}s` }"
        >
          <span
            class="grid size-11 shrink-0 place-items-center rounded-md border"
            :style="{ borderColor: 'var(--line)', color: 'var(--accent)' }"
          >
            <UIcon :name="extraIcons[index % extraIcons.length]!" class="size-5" />
          </span>
          <div class="min-w-0">
            <span class="label block">{{ extra.label }}</span>
            <span class="mt-1.5 block text-sm leading-relaxed" :style="{ color: 'var(--ink)' }">{{ extra.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

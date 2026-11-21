<script setup lang="ts">
interface Entry {
  date: string
  event: string
}

const props = defineProps<{ entries: Entry[] }>()

const grouped = computed(() => {
  const map = new Map<string, Entry[]>()
  props.entries.forEach((entry) => {
    const year = entry.date.match(/\d{4}/)?.[0] ?? '其他'
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(entry)
  })
  map.forEach((items) => items.reverse())
  return Array.from(map, ([year, items]) => ({ year, items }))
    .sort((a, b) => Number(b.year) - Number(a.year))
})

const latestYear = computed(() =>
  grouped.value.reduce((max, g) => (Number(g.year) > Number(max) ? g.year : max), '')
)
</script>

<template>
  <section id="timeline" class="relative scroll-mt-20 py-28">
    <div class="shell">
      <SectionHeading index="02" code="TIMELINE" title="历程" note="从入门到持续构建，一条没有终点的路径。" />

      <div class="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
        <div class="reveal lg:sticky lg:top-28 lg:self-start">
          <div class="serif text-[clamp(5rem,12vw,9rem)] font-light leading-none tracking-tight" :style="{ color: 'var(--line-strong)' }">
            {{ latestYear }}
          </div>
          <p class="mono mt-4 text-xs tracking-[0.16em]" :style="{ color: 'var(--ink-faint)' }">
            — PRESENT
          </p>
          <div class="mt-8 h-px w-16 bg-[var(--accent)]" />
          <p class="mono mt-4 text-[11px] tracking-wider" :style="{ color: 'var(--ink-faint)' }">
            {{ props.entries.length }} ENTRIES RECORDED
          </p>
        </div>

        <div class="relative">
          <div class="absolute bottom-2 left-[5px] top-2 w-px" :style="{ background: 'var(--line)' }" />

          <div v-for="group in grouped" :key="group.year" class="mb-9 last:mb-0">
            <div class="reveal relative mb-4 pl-9">
              <span
                class="absolute left-0 top-1.5 size-[11px] rounded-full border-2"
                :style="{
                  borderColor: group.year === latestYear ? 'var(--accent)' : 'var(--line-strong)',
                  background: 'var(--bg)',
                  boxShadow: group.year === latestYear ? '0 0 12px var(--accent)' : 'none'
                }"
              />
              <span
                class="mono text-sm font-semibold tracking-[0.14em]"
                :style="{ color: group.year === latestYear ? 'var(--accent)' : 'var(--ink)' }"
              >
                {{ group.year }}
              </span>
            </div>

            <div
              v-for="(entry, index) in group.items"
              :key="`${entry.date}-${index}`"
              class="reveal relative pl-9 pb-4 last:pb-0"
              :style="{ animationDelay: `${Math.min(index, 6) * 0.04}s` }"
            >
              <span class="absolute left-[3px] top-2.5 size-1 rounded-full" :style="{ background: 'var(--line-strong)' }" />
              <div class="flex flex-col gap-1 sm:flex-row sm:gap-5">
                <span class="mono shrink-0 text-[11px] tracking-wider sm:w-24" :style="{ color: 'var(--ink-faint)' }">
                  {{ entry.date.replace(/\s*\d{4}\s*年?/, '') || group.year }}
                </span>
                <p class="text-sm leading-relaxed" :style="{ color: 'var(--ink-soft)' }">
                  {{ entry.event }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

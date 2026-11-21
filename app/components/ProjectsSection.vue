<script setup lang="ts">
interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  links: { label: string, url: string }[]
  date: string
  status?: string
}

const props = defineProps<{ projects: Project[] }>()
</script>

<template>
  <section id="projects" class="relative scroll-mt-20 py-28">
    <div class="shell">
      <SectionHeading index="01" code="SELECTED WORK" title="项目" note="从工具到社区，记录每一次从零到一的构建。" />

      <div class="mb-8 flex items-baseline justify-between">
        <span class="label">INDEX / 项目列表</span>
        <span class="mono text-xs" :style="{ color: 'var(--ink-faint)' }">
          [ <CountUp :to="props.projects.length" /> ITEMS ]
        </span>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="reveal group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-lg border p-6"
          :style="{
            borderColor: 'var(--line)',
            background: 'var(--surface)',
            animationDelay: `${index * 0.1}s`
          }"
        >
          <div class="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />

          <div class="flex items-start justify-between">
            <span class="serif text-4xl font-light leading-none transition-colors group-hover:text-[var(--accent)]" :style="{ color: 'var(--line-strong)' }">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span
              v-if="project.status"
              class="mono flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] tracking-wider"
              :style="{ borderColor: 'var(--line)', color: 'var(--ink-faint)' }"
            >
              <span class="size-1 rounded-full" :class="project.status.includes('维护') ? 'bg-emerald-400' : 'bg-amber-400'" />
              {{ project.status }}
            </span>
          </div>

          <div class="mt-10">
            <h3 class="text-2xl font-semibold tracking-tight" :style="{ color: 'var(--ink)' }">
              {{ project.name }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed" :style="{ color: 'var(--ink-soft)' }">
              {{ project.description }}
            </p>

            <div class="mt-5 flex flex-wrap gap-1.5">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="mono rounded border px-2 py-1 text-[10px] tracking-wide"
                :style="{ borderColor: 'var(--line)', color: 'var(--ink-faint)' }"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="mt-6 flex items-end justify-between gap-4 border-t pt-4" :style="{ borderColor: 'var(--line)' }">
            <div class="flex flex-wrap gap-x-4 gap-y-1">
              <a
                v-for="link in project.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="mono group/link inline-flex items-center gap-1 text-[11px] transition-colors hover:text-[var(--accent)]"
                :style="{ color: 'var(--ink-soft)' }"
              >
                {{ link.label }}
                <UIcon name="i-lucide-arrow-up-right" class="size-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
            <span class="mono shrink-0 text-[10px] tracking-wider" :style="{ color: 'var(--ink-faint)' }">{{ project.date }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

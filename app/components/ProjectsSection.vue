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
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="reveal"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <ProjectCard :project="project" :index="index" />
        </div>
      </div>
    </div>
  </section>
</template>

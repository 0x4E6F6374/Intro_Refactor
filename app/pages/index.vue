<script setup lang="ts">
const { data: profile } = await useAsyncData('profile', () =>
  queryCollection('profile').first()
)
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('date', 'DESC').all()
)
const { data: timeline } = await useAsyncData('timeline', () =>
  queryCollection('timeline').first()
)
const { data: skills } = await useAsyncData('skills', () =>
  queryCollection('skills').first()
)
const { data: extras } = await useAsyncData('extras', () =>
  queryCollection('extras').first()
)

useSeoMeta({
  title: () => `${profile.value?.name ?? ''} — ${profile.value?.headline ?? ''}`,
  description: () => profile.value?.subtitle ?? ''
})

useReveal()

const github = computed(() =>
  profile.value?.socials.find((item) => item.label === 'GitHub')?.url ?? '#'
)
const monogram = computed(() => profile.value?.name?.charAt(0) ?? 'W')
</script>

<template>
  <main>
    <LoadingScreen v-if="profile" :name="profile.name" />
    <SiteHeader :github="github" :monogram="monogram" :handle="profile?.name" :logo="profile?.avatars[0]" />

    <HeroSection
      v-if="profile"
      :name="profile.name"
      :identity="profile.identity"
      :headline="profile.headline"
      :subtitle="profile.subtitle"
      :location="profile.location"
      :avatars="profile.avatars"
      :socials="profile.socials"
    />

    <ProjectsSection v-if="projects" :projects="projects" />

    <div class="relative border-y" :style="{ borderColor: 'var(--line)', background: 'var(--bg-soft)' }">
      <TimelineSection v-if="timeline" :entries="timeline.entries" />
    </div>

    <AboutSection v-if="skills && extras" :skills="skills.groups" :extras="extras.items" />

    <SiteFooter
      v-if="profile"
      :name="profile.name"
      :emails="profile.emails"
      :socials="profile.socials"
    />
  </main>
</template>

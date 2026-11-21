<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const pointer = reactive({ x: 0, y: 0 })

const onPointer = (event: PointerEvent) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1
}

const particleColor = computed(() => (isDark.value ? '#67e8f9' : '#0891b2'))
const frameColor = computed(() => (isDark.value ? '#22d3ee' : '#06b6d4'))
const frameColorSoft = computed(() => (isDark.value ? '#818cf8' : '#6366f1'))

onMounted(() => window.addEventListener('pointermove', onPointer, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointermove', onPointer))
</script>

<template>
  <ClientOnly>
    <TresCanvas
      :clear-color="isDark ? '#07090d' : '#f6f8fa'"
      :alpha="true"
      :antialias="true"
      :dpr="[1, 2]"
    >
      <TresPerspectiveCamera :position="[0, 0, 9]" :fov="55" />
      <EffectComposer :key="isDark ? 'dark' : 'light'">
        <UnrealBloom
          :radius="0.6"
          :strength="isDark ? 0.9 : 0.5"
          :threshold="isDark ? 0.15 : 0.35"
        />
        <SceneObjects
          :pointer="pointer"
          :particle-color="particleColor"
          :frame-color="frameColor"
          :frame-color-soft="frameColorSoft"
        />
      </EffectComposer>
    </TresCanvas>
  </ClientOnly>
</template>

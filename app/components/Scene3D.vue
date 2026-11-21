<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const pointer = reactive({ x: 0, y: 0 })

const onPointer = (event: PointerEvent) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1
}

const particleColor = computed(() => (isDark.value ? '#67e8f9' : '#0e7490'))
const frameColor = computed(() => (isDark.value ? '#22d3ee' : '#0e7490'))
const frameColorSoft = computed(() => (isDark.value ? '#818cf8' : '#4f46e5'))

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
      <SceneObjects
        :pointer="pointer"
        :particle-color="particleColor"
        :frame-color="frameColor"
        :frame-color-soft="frameColorSoft"
      />
    </TresCanvas>
  </ClientOnly>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

const props = defineProps<{
  pointer: { x: number, y: number }
  particleColor: string
  frameColor: string
  frameColorSoft: string
}>()

const particles = new THREE.BufferGeometry()
const count = 520
const positions = new Float32Array(count * 3)
for (let i = 0; i < count; i++) {
  const radius = 3 + Math.random() * 7
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
  positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
  positions[i * 3 + 2] = radius * Math.cos(phi)
}
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const coreRef = shallowRef<THREE.Group>()
const ringRef = shallowRef<THREE.Group>()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  const targetX = props.pointer.y * 0.12
  const targetY = props.pointer.x * 0.18
  if (coreRef.value) {
    coreRef.value.rotation.x += (targetX - coreRef.value.rotation.x) * 0.04
    coreRef.value.rotation.y += (targetY - coreRef.value.rotation.y) * 0.04
    coreRef.value.rotation.z = elapsed * 0.03
  }
  if (ringRef.value) {
    ringRef.value.rotation.y -= delta * 0.14
    ringRef.value.rotation.x = Math.sin(elapsed * 0.16) * 0.2
  }
})

onBeforeUnmount(() => particles.dispose())
</script>

<template>
  <TresGroup ref="coreRef" :position="[2.4, 0.3, 0]">
    <TresMesh>
      <TresIcosahedronGeometry :args="[1.55, 1]" />
      <TresMeshBasicMaterial :color="frameColor" wireframe :transparent="true" :opacity="0.5" />
    </TresMesh>
    <TresMesh :scale="0.62">
      <TresIcosahedronGeometry :args="[1.55, 0]" />
      <TresMeshBasicMaterial :color="frameColorSoft" wireframe :transparent="true" :opacity="0.8" />
    </TresMesh>
  </TresGroup>

  <TresGroup ref="ringRef" :position="[2.4, 0.3, 0]" :rotation="[1.1, 0, 0.4]">
    <TresMesh>
      <TresTorusGeometry :args="[2.7, 0.006, 8, 160]" />
      <TresMeshBasicMaterial :color="frameColor" :transparent="true" :opacity="0.35" />
    </TresMesh>
    <TresMesh :rotation="[0.6, 0.4, 0]">
      <TresTorusGeometry :args="[3.1, 0.004, 8, 160]" />
      <TresMeshBasicMaterial :color="frameColorSoft" :transparent="true" :opacity="0.25" />
    </TresMesh>
  </TresGroup>

  <TresPoints :geometry="particles">
    <TresPointsMaterial
      :color="particleColor"
      :size="0.028"
      :transparent="true"
      :opacity="0.7"
      size-attenuation
    />
  </TresPoints>
</template>

<template>
  <div
    v-if="message"
    role="alert"
    :class="[
      'flex items-start gap-2 rounded-xl px-4 py-3 text-sm animate-fade-in',
      variantClass
    ]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path v-if="type === 'error'" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message?: string | null
  type?: 'error' | 'success'
}>()

const variantClass = computed(() =>
  props.type === 'success'
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    : 'bg-rose-50 text-rose-700 border border-rose-200'
)
</script>

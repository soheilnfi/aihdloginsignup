<template>
  <div>
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>

    <div class="relative">
      <span v-if="icon" class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        <component :is="icon" class="h-4 w-4" />
      </span>

      <input
        :id="id"
        :type="resolvedType"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :class="[
          'form-input',
          icon && 'pr-10',
          type === 'password' && 'pl-10',
          error && 'form-input-error'
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      >

      <button
        v-if="type === 'password'"
        type="button"
        class="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-slate-600"
        :aria-label="showPassword ? 'پنهان کردن رمز' : 'نمایش رمز'"
        @click="showPassword = !showPassword"
      >
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.6 21.6 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a21.78 21.78 0 01-3.16 4.19M1 1l22 22" />
        </svg>
      </button>
    </div>

    <p v-if="error" class="form-error">{{ error }}</p>
    <p v-else-if="hint" class="mt-1.5 text-xs text-slate-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  icon?: unknown
  id?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const showPassword = ref(false)
const resolvedType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type ?? 'text'
})
</script>

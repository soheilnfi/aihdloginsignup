<template>
  <section class="flex min-h-screen items-center justify-center px-4 text-center">
    <div>
      <p class="text-sm font-medium text-brand-600">خطا {{ error.statusCode }}</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">{{ error.statusCode === 404 ? 'صفحه پیدا نشد' : 'خطایی رخ داد' }}</h1>
      <p class="mt-2 text-slate-500">{{ error.message }}</p>
      <button class="btn-primary mt-6" @click="handleError">بازگشت به خانه</button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number; message: string } }>()
const handleError = () => clearError({ redirect: '/' })
</script>

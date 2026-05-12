<template>
  <section class="mx-auto max-w-3xl px-4 py-16">
    <div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-soft animate-fade-in">
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
          {{ initials }}
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-900">سلام {{ user?.name }} 👋</h1>
          <p class="text-sm text-slate-500">{{ user?.email }}</p>
        </div>
      </div>

      <p class="mt-6 text-sm text-slate-600">
        با موفقیت وارد حساب کاربری خود شدید. این یک صفحه نمونه است که از طریق میدلور <code class="rounded bg-slate-100 px-1 text-xs">auth</code> محافظت می‌شود.
      </p>

      <div class="mt-6 flex gap-2">
        <button class="btn-ghost" @click="logout">خروج از حساب</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()
const initials = computed(() => user.value?.name?.charAt(0)?.toUpperCase() ?? 'U')
</script>

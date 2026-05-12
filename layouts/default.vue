<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-slate-100 bg-white/70 backdrop-blur">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-brand-700">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">A</span>
          <span>حساب کاربری</span>
        </NuxtLink>
        <nav v-if="!user" class="flex items-center gap-2 text-sm">
          <NuxtLink to="/login" class="text-slate-600 hover:text-brand-700">ورود</NuxtLink>
          <span class="text-slate-300">|</span>
          <NuxtLink to="/signup" class="text-slate-600 hover:text-brand-700">ثبت‌نام</NuxtLink>
        </nav>
        <div v-else class="flex items-center gap-3 text-sm">
          <span class="text-slate-600">{{ user.name }}</span>
          <button class="btn-ghost py-1.5 px-3" @click="logout">خروج</button>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
      ساخته‌شده با Nuxt 3 و Tailwind CSS
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
</script>

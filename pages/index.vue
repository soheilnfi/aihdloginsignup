<template>
  <section class="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
    <span class="mb-4 inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
      Nuxt 3 + Tailwind CSS
    </span>
    <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
      سامانه ورود و ثبت‌نام آماده
    </h1>
    <p class="mt-4 max-w-2xl text-slate-600">
      یک شروع تمیز برای پروژه شما با صفحات ورود و ثبت‌نام، اعتبارسنجی فرم، میدلور‌های auth/guest، و طراحی واکنش‌گرا RTL.
    </p>
    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <NuxtLink to="/signup" class="btn-primary">شروع کنید</NuxtLink>
      <NuxtLink to="/login" class="btn-ghost">ورود به حساب</NuxtLink>
    </div>

    <div class="mt-16 grid w-full gap-4 sm:grid-cols-3">
      <div v-for="f in features" :key="f.title" class="rounded-2xl border border-slate-100 bg-white p-5 text-right shadow-sm">
        <h3 class="font-semibold text-slate-800">{{ f.title }}</h3>
        <p class="mt-1 text-sm text-slate-500">{{ f.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { title: 'اعتبارسنجی با Zod', desc: 'بررسی فرم در سمت کاربر با پیام‌های فارسی.' },
  { title: 'میدلور Auth/Guest', desc: 'محافظت از مسیرها و هدایت خودکار کاربر.' },
  { title: 'طراحی RTL', desc: 'پشتیبانی کامل از راست‌چین با Tailwind.' }
]
</script>

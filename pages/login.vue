<template>
  <section class="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-10">
    <div class="auth-card">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold text-slate-900">ورود به حساب</h1>
        <p class="mt-1 text-sm text-slate-500">خوش آمدید! اطلاعات حساب خود را وارد کنید.</p>
      </div>

      <AlertMessage v-if="serverError" :message="serverError" type="error" class="mb-4" />

      <form class="space-y-4" novalidate @submit.prevent="onSubmit">
        <FormField
          id="email"
          v-model="form.email"
          label="ایمیل"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
          :error="errors.email"
          @blur="validateField('email')"
        />

        <FormField
          id="password"
          v-model="form.password"
          label="رمز عبور"
          type="password"
          autocomplete="current-password"
          placeholder="••••••••"
          required
          :error="errors.password"
          @blur="validateField('password')"
        />

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-slate-600">
            <input v-model="form.remember" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
            <span>مرا به خاطر بسپار</span>
          </label>
          <a href="#" class="text-brand-700 hover:underline">فراموشی رمز عبور؟</a>
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          <svg v-if="loading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>{{ loading ? 'در حال ورود...' : 'ورود' }}</span>
        </button>
      </form>

      <div class="relative my-6 text-center text-xs text-slate-400">
        <span class="bg-white px-3 relative z-10">یا</span>
        <div class="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
      </div>

      <p class="text-center text-sm text-slate-600">
        حساب کاربری ندارید؟
        <NuxtLink to="/signup" class="font-medium text-brand-700 hover:underline">ثبت‌نام کنید</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { loginSchema, pickErrors } from '~/utils/validators'

definePageMeta({ middleware: 'guest' })

const { login } = useAuth()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive<Record<string, string>>({})
const serverError = ref<string | null>(null)
const loading = ref(false)

const validateField = (key: 'email' | 'password') => {
  const result = loginSchema.safeParse(form)
  const all = pickErrors(result)
  errors[key] = all[key] ?? ''
}

const onSubmit = async () => {
  serverError.value = null
  const result = loginSchema.safeParse(form)
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!result.success) {
    Object.assign(errors, pickErrors(result))
    return
  }

  loading.value = true
  try {
    await login({ email: form.email, password: form.password })
    const redirect = (route.query.redirect as string) || '/dashboard'
    await router.push(redirect)
  } catch (err) {
    serverError.value = err instanceof Error ? err.message : 'خطایی رخ داد، دوباره تلاش کنید.'
  } finally {
    loading.value = false
  }
}
</script>

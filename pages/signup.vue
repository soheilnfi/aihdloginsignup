<template>
  <section class="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-10">
    <div class="auth-card">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold text-slate-900">ساخت حساب جدید</h1>
        <p class="mt-1 text-sm text-slate-500">برای شروع، فرم زیر را تکمیل کنید.</p>
      </div>

      <AlertMessage v-if="serverError" :message="serverError" type="error" class="mb-4" />

      <form class="space-y-4" novalidate @submit.prevent="onSubmit">
        <FormField
          id="name"
          v-model="form.name"
          label="نام و نام خانوادگی"
          autocomplete="name"
          placeholder="مثلاً علی رضایی"
          required
          :error="errors.name"
          @blur="validateField('name')"
        />

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
          autocomplete="new-password"
          placeholder="حداقل ۶ کاراکتر"
          required
          hint="ترکیبی از حرف و عدد، حداقل ۶ کاراکتر"
          :error="errors.password"
          @blur="validateField('password')"
        />

        <div class="space-y-1">
          <div class="flex gap-1">
            <span
              v-for="i in 4"
              :key="i"
              class="h-1.5 flex-1 rounded-full transition-colors"
              :class="i <= strength.score ? strength.color : 'bg-slate-200'"
            />
          </div>
          <p v-if="form.password" class="text-xs text-slate-500">قدرت رمز: {{ strength.label }}</p>
        </div>

        <FormField
          id="confirmPassword"
          v-model="form.confirmPassword"
          label="تکرار رمز عبور"
          type="password"
          autocomplete="new-password"
          placeholder="••••••••"
          required
          :error="errors.confirmPassword"
          @blur="validateField('confirmPassword')"
        />

        <label class="flex items-start gap-2 text-sm text-slate-600">
          <input v-model="form.acceptTerms" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
          <span>
            <span>با</span>
            <a href="#" class="text-brand-700 hover:underline">قوانین و حریم خصوصی</a>
            <span>موافقم.</span>
          </span>
        </label>
        <p v-if="errors.acceptTerms" class="form-error">{{ errors.acceptTerms }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          <svg v-if="loading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>{{ loading ? 'در حال ساخت حساب...' : 'ثبت‌نام' }}</span>
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-600">
        قبلاً حساب ساخته‌اید؟
        <NuxtLink to="/login" class="font-medium text-brand-700 hover:underline">وارد شوید</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { signupSchema, pickErrors } from '~/utils/validators'

definePageMeta({ middleware: 'guest' })

const { signup } = useAuth()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})
const errors = reactive<Record<string, string>>({})
const serverError = ref<string | null>(null)
const loading = ref(false)

const strength = computed(() => {
  const p = form.password
  let score = 0
  if (p.length >= 6) score++
  if (/[A-Za-z]/.test(p) && /\d/.test(p)) score++
  if (p.length >= 10) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  const map = [
    { label: 'بسیار ضعیف', color: 'bg-rose-400' },
    { label: 'ضعیف', color: 'bg-orange-400' },
    { label: 'متوسط', color: 'bg-amber-400' },
    { label: 'خوب', color: 'bg-lime-500' },
    { label: 'قوی', color: 'bg-emerald-500' }
  ]
  return { score, ...map[score] }
})

const validateField = (key: keyof typeof form) => {
  const result = signupSchema.safeParse(form)
  const all = pickErrors(result)
  errors[key as string] = all[key as string] ?? ''
  if (key === 'password' && form.confirmPassword) {
    errors.confirmPassword = all.confirmPassword ?? ''
  }
}

const onSubmit = async () => {
  serverError.value = null
  Object.keys(errors).forEach((k) => delete errors[k])

  const result = signupSchema.safeParse(form)
  if (!result.success) {
    Object.assign(errors, pickErrors(result))
    return
  }

  loading.value = true
  try {
    await signup({ name: form.name, email: form.email, password: form.password })
    await router.push('/dashboard')
  } catch (err) {
    serverError.value = err instanceof Error ? err.message : 'خطایی رخ داد، دوباره تلاش کنید.'
  } finally {
    loading.value = false
  }
}
</script>

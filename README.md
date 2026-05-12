# سامانه ورود و ثبت‌نام (Nuxt 3 + Tailwind CSS)

یک پروژه شروع کامل با صفحات **ورود** و **ثبت‌نام** فارسی/RTL، اعتبارسنجی فرم با Zod، میدلور‌های `auth` و `guest`، و طراحی واکنش‌گرا.

## ویژگی‌ها

- Nuxt 3 با TypeScript
- Tailwind CSS با تم سفارشی و فونت Vazirmatn
- صفحات `/login`، `/signup`، `/dashboard` و صفحه اصلی
- اعتبارسنجی سمت کلاینت با [Zod](https://zod.dev) و پیام‌های فارسی
- نشانگر قدرت رمز عبور در ثبت‌نام
- composable به نام `useAuth` با ذخیره توکن در کوکی
- میدلور `auth` (محافظت از مسیر) و `guest` (هدایت کاربر واردشده)
- کامپوننت‌های reusable: `FormField`، `AlertMessage`

## اجرا

```bash
# نصب وابستگی‌ها
npm install

# اجرای حالت توسعه روی http://localhost:3000
npm run dev

# بیلد production
npm run build
npm run preview
```

## ساختار

```
.
├── app.vue
├── layouts/default.vue        # هدر/فوتر سراسری
├── pages/
│   ├── index.vue              # لندینگ
│   ├── login.vue              # ورود
│   ├── signup.vue             # ثبت‌نام
│   └── dashboard.vue          # داشبورد محافظت‌شده
├── components/
│   ├── FormField.vue          # ورودی فرم با لیبل/خطا/آیکن
│   └── AlertMessage.vue       # آلرت خطا/موفقیت
├── composables/useAuth.ts     # state و عملیات auth
├── middleware/
│   ├── auth.ts                # نیازمند ورود
│   └── guest.ts               # نیازمند خروج
├── utils/validators.ts        # اسکیمای Zod
├── plugins/auth.client.ts     # hydrate کاربر از کوکی
├── assets/css/main.css        # styles & utility classes
├── tailwind.config.ts
└── nuxt.config.ts
```

## اتصال به API واقعی

در `composables/useAuth.ts` تابع‌های `login` و `signup` با تأخیر شبیه‌سازی شده و توکن جعلی می‌سازند. کافی است این بخش را با `$fetch` به سمت API بک‌اند خود جایگزین کنید:

```ts
const { data } = await $fetch('/api/auth/login', {
  method: 'POST',
  body: { email, password }
})
user.value = data.user
token.value = data.token
```

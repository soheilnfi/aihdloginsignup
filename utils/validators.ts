import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'ایمیل الزامی است.' })
    .min(1, 'ایمیل الزامی است.')
    .email('قالب ایمیل معتبر نیست.'),
  password: z
    .string({ required_error: 'رمز عبور الزامی است.' })
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.')
})

export const signupSchema = z
  .object({
    name: z
      .string({ required_error: 'نام الزامی است.' })
      .min(2, 'نام باید حداقل ۲ کاراکتر باشد.'),
    email: z
      .string({ required_error: 'ایمیل الزامی است.' })
      .min(1, 'ایمیل الزامی است.')
      .email('قالب ایمیل معتبر نیست.'),
    password: z
      .string({ required_error: 'رمز عبور الزامی است.' })
      .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.')
      .regex(/[A-Za-z]/, 'رمز عبور باید حداقل یک حرف داشته باشد.')
      .regex(/\d/, 'رمز عبور باید حداقل یک عدد داشته باشد.'),
    confirmPassword: z
      .string({ required_error: 'تکرار رمز عبور الزامی است.' })
      .min(1, 'تکرار رمز عبور الزامی است.'),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'برای ادامه باید قوانین را بپذیرید.' })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن یکسان نیستند.',
    path: ['confirmPassword']
  })

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>

export function pickErrors<T extends z.ZodTypeAny>(result: z.SafeParseReturnType<unknown, z.infer<T>>) {
  if (result.success) return {}
  const fieldErrors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = issue.path.join('.')
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return fieldErrors
}

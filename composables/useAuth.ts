interface AuthUser {
  id: string
  name: string
  email: string
}

interface Credentials {
  email: string
  password: string
}

interface SignupData extends Credentials {
  name: string
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth:user', () => null)
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  })

  const isAuthenticated = computed(() => !!user.value)

  const hydrate = () => {
    if (token.value && !user.value) {
      try {
        const payload = JSON.parse(atob(token.value))
        user.value = payload
      } catch {
        token.value = null
      }
    }
  }

  const login = async ({ email, password }: Credentials) => {
    await new Promise((r) => setTimeout(r, 700))

    if (password.length < 6) {
      throw new Error('ایمیل یا رمز عبور نادرست است.')
    }

    const fakeUser: AuthUser = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email
    }
    user.value = fakeUser
    token.value = btoa(JSON.stringify(fakeUser))
    return fakeUser
  }

  const signup = async ({ name, email, password }: SignupData) => {
    await new Promise((r) => setTimeout(r, 900))

    if (password.length < 6) {
      throw new Error('رمز عبور باید حداقل ۶ کاراکتر باشد.')
    }

    const fakeUser: AuthUser = {
      id: crypto.randomUUID(),
      name,
      email
    }
    user.value = fakeUser
    token.value = btoa(JSON.stringify(fakeUser))
    return fakeUser
  }

  const logout = async () => {
    user.value = null
    token.value = null
    await navigateTo('/login')
  }

  return {
    user,
    isAuthenticated,
    hydrate,
    login,
    signup,
    logout
  }
}

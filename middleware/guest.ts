export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, hydrate } = useAuth()
  hydrate()
  if (isAuthenticated.value) {
    return navigateTo('/dashboard')
  }
})

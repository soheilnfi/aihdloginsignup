export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, hydrate } = useAuth()
  hydrate()
  if (!isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})

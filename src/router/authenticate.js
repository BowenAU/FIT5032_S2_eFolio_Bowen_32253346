import { ref } from 'vue'
import router from '../router/index'

export const isAuthenticated = ref(false)
export const login = () => {
  isAuthenticated.value = true
  // router.push({name:'About'})
}

export const logout = () => {
  isAuthenticated.value = false
}

export const setIsAuthenticated = (params) => {
  isAuthenticated.value = params
}

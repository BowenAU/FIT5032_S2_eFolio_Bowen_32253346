import { ref } from "vue"
import router from '../router/index'

const isAuthenticated = ref(false)

export function useAuth() {

    const login = () => {
        isAuthenticated.value = true;
        // router.push({name:'About'})
    }

    const logout = () =>{
        isAuthenticated.value = false; 
    } 

    return { isAuthenticated, login,logout }
    
}
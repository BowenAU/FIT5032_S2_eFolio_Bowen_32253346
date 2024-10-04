<template>
  <div class="container">
    <div class="row mb-3 offset-md-4">
      <div class="col-md-6 col-sm-6">
        <h2>💡 Firebase signin</h2>
        <p>
          <input type="text" placeholder="Email" v-model="email" />
        </p>
        <p>
          <input type="password" placeholder="Password" v-model="password" />
        </p>
        <p>
          <button type="button" class="btn btn-outline-primary" @click="fireSignin">
            Sign in Firebase
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = getAuth()
const router = useRouter()

const adminEmail = 'admin@gmail.com'
const fireSignin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      if (userCredential.user.email == adminEmail) {
        alert('Hello, admin!')
        router.push('/Login')
      } else {
        alert('Congratulation! Login succeed!')
        router.push('/')
      }
      console.log('Login succeed!')
      console.log('userCredential', userCredential)
      console.log('userCredential.user', userCredential.user)
      console.log('auth', auth)
    })
    .catch((error) => {
      console.log('Login failed!')
      const errorCode = error.code
      const errorMessage = error.message
      console.log('Login error code', errorCode)
      console.log('Login error message', errorMessage)
      alert('Sorry, Login failed, error message: ' + errorMessage)
    })
}
</script>

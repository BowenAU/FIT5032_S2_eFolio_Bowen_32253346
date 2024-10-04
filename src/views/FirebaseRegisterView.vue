<template>
  <div class="container">
    <div class="row mb-3 offset-md-4">
      <div class="col-md-6 col-sm-6">
        <h2>💡 Create an account</h2>
        <p>
          <input type="text" placeholder="Email" v-model="email" />
        </p>
        <p>
          <input type="password" placeholder="Password" v-model="password" />
        </p>
        <p>
          <button type="button" class="btn btn-outline-primary" @click="register">
            Save to Firebase
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = getAuth()
const router = useRouter()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Registration succeed!')
      console.log('userCredential', userCredential)
      console.log('userCredential.user', userCredential.user)
      alert('Congratulation! Registration succeed!')
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log('Registration failed!')
      const errorCode = error.code
      const errorMessage = error.message
      console.log('register error code', errorCode)
      console.log('register error message', errorMessage)
      alert('Sorry, Registration failed, error message: ' + errorMessage)
    })
}
</script>

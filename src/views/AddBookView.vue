<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="number" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// import db from '../firebase/init.js';
// import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const response = await axios.post('https://addbook-256iojhqdq-uc.a.run.app', {
      isbn: isbn.value,
      name: name.value
    })
    console.log('response', response.data)
    alert('Book added successfully!')
  } catch (err) {
    console.error('Error: ', err)
  }
}
</script>

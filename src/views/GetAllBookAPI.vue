<template>
  <div>
    <h1>All Books Information</h1>
    <pre v-if="books">{{ books }}</pre>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const books = ref(null)
const error = ref('')

const getAllBooks = async () => {
  try {
    const response = await axios.get('https://getallbooks-256iojhqdq-uc.a.run.app')
    books.value = JSON.stringify(response.data, null, 2)
  } catch (err) {
    console.error('Error fetching book data: ', err)
    error.value = 'Error fetching book data: ' + err.message
  }
}

getAllBooks()
</script>

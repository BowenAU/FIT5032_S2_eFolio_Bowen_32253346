<template>
  <pre>{{ count }}</pre>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const count = ref('')
const error = ref('')

const getBookCount = async () => {
  try {
    const response = await axios.get('https://countbooks-256iojhqdq-uc.a.run.app/countbooks')
    console.log('response', response.data)
    count.value = response.data
  } catch (err) {
    console.error('Error: ', err)
    error.value = err
    count.value = null
  }
}

getBookCount()
</script>

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
  import { ref } from 'vue';
  import db from '../firebase/init.js';
  import { collection, addDoc } from 'firebase/firestore';
  
      const isbn = ref('');
      const name = ref('');
  
      const addBook = async () => {
          try{
          if (isNaN(Number(isbn.value))) {
            alert('ISBN must be a valid number');
            return;
          }
  
          await addDoc(collection(db, 'books'), {
            isbn: Number(isbn.value),
            name: name.value
          });
          isbn.value = '';
          name.value = '';
          alert('Book added successfully!');
        } catch (error) {
          console.error('Error adding book: ', error);
        }
      };
  


  </script>
  
  
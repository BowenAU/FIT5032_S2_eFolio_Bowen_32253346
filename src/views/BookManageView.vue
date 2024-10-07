<template>
    <div>
      <h1>Book Manage</h1>
      <form @submit.prevent="bookManage">
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
  import { setDoc, getDoc, doc } from 'firebase/firestore';
  
      const isbn = ref('');
      const name = ref('');
      const getBook = async () => {
        try{ 
          const docRef = doc(db, "books", "4RQ9nd8Q7VJve1hslNax");
          const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            isbn.value = docSnap.data().isbn;
            name.value = docSnap.data().name;
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            }
        } catch (error) {
            console.error('Error get book', error)
        }
    }
  
  
      const bookManage = async () => {
          try{
          if (isNaN(Number(isbn.value))) {
            alert('ISBN must be a valid number');
            return;
          }
          
        //   const cityRef = doc(db, 'cities', 'BJ');
        //   await setDoc(cityRef, { capital: true }, { merge: true});
          await setDoc(doc(db, 'books', '4RQ9nd8Q7VJve1hslNax'), {
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

      getBook();
  


  </script>
  
  
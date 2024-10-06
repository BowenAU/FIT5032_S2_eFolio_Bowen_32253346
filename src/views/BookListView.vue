<template>
    <div class="card">
      <DataTable :value="books" tableStyle="min-width: 50rem">
        <Column field="isbn" header="ISBN"></Column>
        <Column field="name" header="Name"></Column>
      </DataTable>
    </div>
  </template>


<script setup>
import { ref } from 'vue';
import db from '../firebase/init.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { collection, query, where, getDocs } from 'firebase/firestore';

const books = ref([])
const fetchBooks = async() =>{
    try{
        const q = query(collection(db,'books'), where('isbn', '>', 1000))
        // const booksArray = [];
        const queryResult = await getDocs(q)
        queryResult.forEach((doc) => {
          books.value.push({ id:doc.id, ...doc.data()})
        })
        // books.value = booksArray;
        console.log("booklist: ", books)
      
    } catch(error)
    {
      console.error("Booking list fetch error", error)
    }
  } 
  fetchBooks()
</script>

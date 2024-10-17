<template>
  <div class="card">
    <DataTable :value="books" tableStyle="min-width: 50rem">
      <Column field="isbn" header="ISBN"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="action" header="Actions">
        <template #body="slotProps">
          <p>{{ slotProps.data.id }}</p>
          <button @click="navigetToBookManage(slotProps.data.id)">Book Manage</button>
          <button @click="deleteBook(slotProps.data.id)">Delete Manage</button>
        </template>
      </Column>
    </DataTable>
  </div>
  <button @click="orderByAscending()">order By ascending</button>
  <button @click="orderByDescending()">order By descending</button>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  limit
} from 'firebase/firestore'
import router from '../router/index'

const books = ref([])
const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    books.value = []
    const queryResult = await getDocs(q)
    queryResult.forEach((doc) => {
      books.value.push({ id: doc.id, ...doc.data() })
    })
    console.log('booklist: ', books)
  } catch (error) {
    console.error('Booking list fetch error', error)
  }
}
fetchBooks()
const navigetToBookManage = (id) => {
  router.push({ name: 'BookManage', paras: { bookid: id } })
}

const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, 'books', id))
    alert('Delete book successfully!')
    fetchBooks()
  } catch (error) {
    console.erroe('Delete error', error)
  }
}

const orderByAscending = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1), orderBy('isbn'))
    books.value = []
    const queryResult = await getDocs(q)
    queryResult.forEach((doc) => {
      books.value.push({ id: doc.id, ...doc.data() })
    })
  } catch (error) {
    console.error('Error fetching documents: ', error)
  }
}

const orderByDescending = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1),
      orderBy('isbn', 'desc'),
      limit(1)
    )
    books.value = []
    const queryResult = await getDocs(q)
    queryResult.forEach((doc) => {
      books.value.push({ id: doc.id, ...doc.data() })
    })
  } catch (error) {
    console.error('Error fetching documents: ', error)
  }
}
</script>

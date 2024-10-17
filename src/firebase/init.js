// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4_djjTY9f96dHP1NIDq6z5oWYrnC33QA',
  authDomain: 'week7-bowen-9020a.firebaseapp.com',
  projectId: 'week7-bowen-9020a',
  storageBucket: 'week7-bowen-9020a.appspot.com',
  messagingSenderId: '852693647056',
  appId: '1:852693647056:web:d61544f05a9f6d2d2a68d5'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db

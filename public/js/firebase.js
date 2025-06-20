// firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyApWfLdbBxnunf05iO3Xudg_h5emRz_1oE",
  authDomain: "bloggingwebsite-36b78.firebaseapp.com",
  projectId: "bloggingwebsite-36b78",
  storageBucket: "bloggingwebsite-36b78.appspot.com",
  messagingSenderId: "752004658475",
  appId: "1:752004658475:web:081baf2838f121333ac16e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

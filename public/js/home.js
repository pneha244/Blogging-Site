import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase configuration
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

const blogSection = document.querySelector('.blogs-section');

const blogsCollection = collection(db, "blogs");

getDocs(blogsCollection).then((blogsSnapshot) => {
    blogsSnapshot.forEach((blog) => {
        if (blog.id !== decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    });
}).catch((error) => {
    console.error('Error getting documents: ', error);
});

const createBlog = (blog) => {
    const data = blog.data();
    blogSection.innerHTML += `
        <div class="blog-card">
            <img src="${data.bannerImage}" class="blog-image" alt="">
            <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
            <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
            <a href="/${blog.id}" class="btn dark">read</a>
        </div>
    `;
};

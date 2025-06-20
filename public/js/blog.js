import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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

let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = doc(db, 'blogs', blogId);

getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
        setupBlog(docSnap.data());
    } else {
        location.replace("/");
    }
}).catch((error) => {
    console.error('Error getting document:', error);
});

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const publish = document.querySelector('.published');

    banner.style.backgroundImage = `url(${data.bannerImage})`;
    blogTitle.textContent = data.title;
    publish.textContent = `Published at - ${data.publishedAt}`;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
};

const addArticle = (ele, data) => {
    // Implement functionality to add the article content to the DOM element
    data = data.split("\n").filter(item => item.length);
    //`console.log(data);

    data.forEach(item => {
        //check for heading
        if(item[0] == '#'){
            let hCount =0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>` 
        } 
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i =0; i<= item.length; i++){
                if(item[i] == "]" &&item[i+1] == "(" && item[item.length - 1] == ")" ){
                    seperator = i;
                }
            }
            let alt = item.slice(2,seperator);
            let src = item.slice(seperator + 2, item.length -1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">`;
        }
        
        else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
};

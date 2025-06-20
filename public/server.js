const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const initial_path = path.join(__dirname, "public");

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

const app = express();
app.use(express.static(initial_path));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

// Upload link
app.post('/upload', (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // Image name
  let imagename = date.getDate() + date.getTime() + file.name;
  // Image upload path
  let uploadPath = path.join('public/uploads', imagename);

  // Create upload
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      // Our image upload path
      res.json({ imagename: `uploads/${imagename}` });
    }
  });
});

app.get("/:blog", (req, res) => {
  res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req,res) => {
  res.json("404");
})

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

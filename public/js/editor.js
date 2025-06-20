import { db } from './firebase.js';
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

// Event listener for banner image upload
bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, "banner");
});

// Event listener for image upload in the article
uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, "image");
});

// Function to handle image upload
const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', { // Ensure the /upload endpoint is correctly set up on your server
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (uploadType === "image") {
          addImage(data.imagename, file.name);
        } else {
          bannerPath = `${location.origin}/${data.imagename}`;
          banner.style.backgroundImage = `url("${bannerPath}")`;
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  } else {
    alert("Please upload an image file.");
  }
};

// Function to add image to the article content
const addImage = (imagepath, alt) => {
  let curPos = articleField.selectionStart;
  let textToInsert = `\r![${alt}](${imagepath})\r`;
  articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Event listener for the publish button
publishBtn.addEventListener('click', async () => {
  if (articleField.value.length && blogTitleField.value.length) {
    let date = new Date();
    let blogTitle = blogTitleField.value.split(" ").join("-");
    let id = '';
    let letters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    let docName = `${blogTitle}-${id}`;

    try {
      await setDoc(doc(collection(db, "blogs"), docName), {
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
      });
      location.href = `/${docName}`;
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  } else {
    alert("Please enter both blog title and article content.");
  }
});

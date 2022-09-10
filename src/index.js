import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBZQ-03V20Wijjf1x7fgmqqHP56-xEW-po",
    authDomain: "login-form-39e52.firebaseapp.com",
    projectId: "login-form-39e52",
    storageBucket: "login-form-39e52.appspot.com",
    messagingSenderId: "190483679230",
    appId: "1:190483679230:web:4abc4d6288baf1d49ba2af"
  };

initializeApp(firebaseConfig);

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "Accounts");

getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let Accounts = []
    snapshot.docs.forEach(doc => {
      Accounts.push({ ...doc.data(), id: doc.id })
    })
    console.log(Accounts)
  })
  .catch(err => {
    console.log(err.message)
  })


// realtime collection data
onSnapshot(colRef, (snapshot) => {
  let Accounts = []
  snapshot.docs.forEach(doc => {
    Accounts.push({ ...doc.data(), id: doc.id })
  })
  console.log(Accounts)
})

// adding docs
const addAccountsForm = document.querySelector('.add')
addAccountsForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    name: addAccountsForm.name.value,
    feedback: addAccountsForm.feedback.value,
  })
  .then(() => {
    addAccountsForm.reset()
  })
})
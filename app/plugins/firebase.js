import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAQC9uGBWXoKoNAZ6KTVHs_sVgKFE982XE",
  authDomain: "next-practice-0312.firebaseapp.com",
  databaseURL: "https://next-practice-0312.firebaseio.com",
  projectId: "next-practice-0312",
  storageBucket: "next-practice-0312.appspot.com",
  messagingSenderId: "887759306652",
  appId: "1:887759306652:web:27b07af57e61754b8e1259"
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
export default db

export const messagesRef = db.collection('messages')
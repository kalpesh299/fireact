import firebase from "firebase/app";
import "firebase/firestore";




const firebaseConfig = {
      apiKey: "AIzaSyC6I7Eb2Q1_bM1pp2QjIdaPK-cgDBkWQGg",
      authDomain: "school-directory-b2855.firebaseapp.com",
      projectId: "school-directory-b2855",
      storageBucket: "school-directory-b2855.appspot.com",
      messagingSenderId: "105768719758",
      appId: "1:105768719758:web:31108eeba97479e784c0df"
    };

firebase.initializeApp(firebaseConfig); 
export default firebase;   
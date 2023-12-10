  import { initializeApp } from "firebase/app";
  import { getDatabase} from 'firebase/database';

  const firebaseConfig = {
    apiKey: "AIzaSyCCmKLBSNbwUMCBzOR6uBvFReyH84wepDM",
    authDomain: "mosquitominder-28264.firebaseapp.com",
    databaseURL: "https://mosquitominder-28264-default-rtdb.firebaseio.com",
    projectId: "mosquitominder-28264",
    storageBucket: "mosquitominder-28264.appspot.com",
    messagingSenderId: "1085337145875",
    appId: "1:1085337145875:web:a5db34805bb0d7ef6725e6"
  };


  const firebaseApp  = initializeApp(firebaseConfig);
  const db = getDatabase(firebaseApp);
  
  export { db };
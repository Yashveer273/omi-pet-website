import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDr-11dHqJzluJ2hyvNRtsy-F5MwOc3kcI",
  authDomain: "omipet.firebaseapp.com",
  projectId: "omipet",
  storageBucket: "omipet.firebasestorage.app",
  messagingSenderId: "673111453731",
  appId: "1:673111453731:web:631b16109b792e4afbc196",
  measurementId: "G-PLWM54HYXC"
};

const app = initializeApp(firebaseConfig);

export const firestore=getFirestore(app);
export const storage = getStorage(app); 
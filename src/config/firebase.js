// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore,setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVa3Vu0xibWgqNXr7PuQoQh9r9ajftYFM",
  authDomain: "chatify-webapp.firebaseapp.com",
  projectId: "chatify-webapp",
  storageBucket: "chatify-webapp.appspot.com",
  messagingSenderId: "952165224955",
  appId: "1:952165224955:web:29e84d849251220602bb5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(username,email,password)=>{
  try{
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey  There i am using Chatify",
      lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
      chatsData:[]
    })
  }
  catch(error){
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const login=async(email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
}
catch(error){
console.error(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const logout=async ()=>{
try {
  await signOut(auth)
} catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
}
}
export {signup,login,logout,auth,db};
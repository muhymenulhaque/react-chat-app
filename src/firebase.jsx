import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs, getFirestore, setDoc, collection, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { getAuth, signInAnonymously, updateProfile, signOut } from "firebase/auth";

//didnt clean this file

const firebaseConfig = {
  apiKey: "AIzaSyA7R9ZOzh10Yi68nTNAI45zVZ6RO18GjMU",
  authDomain: "fun-chat-app-f5824.firebaseapp.com",
  databaseURL: "https://fun-chat-app-f5824-default-rtdb.firebaseio.com",
  projectId: "fun-chat-app-f5824",
  storageBucket: "fun-chat-app-f5824.appspot.com",
  messagingSenderId: "670631234380",
  appId: "1:670631234380:web:8ffee02460cd42ba349de9",
  measurementId: "G-KE94CVENFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const getServerTimestamp = () => {
  return serverTimestamp();
}

const setNewName = async (verifiedLink, name) => {
  localStorage.setItem(verifiedLink, name);

  // create avatar based on random color
  const randomNumColor = Math.floor(Math.random() * 338);

  let res = await getDoc(doc(db, "gradients", randomNumColor.toString()));
	if (!res) {
    
  } else {
    let color = res.data();
    localStorage.setItem(verifiedLink + ".start", color.start);
    localStorage.setItem(verifiedLink + ".end", color.end)
  }
}

const newLink = async (name) => {
  const randomLink = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let link = "";

    for (let i = 0; i < 8; i++) {
        const rand = Math.floor(Math.random() * characters.length);
        link += characters[rand];
    }
    return link;
  }


  const verifyLink = async (link) => {
    const res = await getDoc(doc(db, "links", link));
    
    if (res.exists()) 
      return false;
    else
      return true;
  }

  let verifiedLink = randomLink();
  while(!verifyLink(verifiedLink)) {
    verifiedLink = randomLink();
  }

  // create room with verified link
  setNewName(verifiedLink, name)
  await setDoc(doc(db, "links", verifiedLink), {created: serverTimestamp()});
  await setDoc(doc(db, "links", verifiedLink, "messages", "-1"), {message: "negative 1"});
  await setDoc(doc(db, "links", verifiedLink, "metas", "latestId"), {message: "-1"});


  

  return verifiedLink;
}




//Get Latest ID of Message 
const getLatestId = async (roomId) => {
  const latestIdRef = doc(db, "links", roomId, "metas", "latestId");
  const res = await getDoc(latestIdRef);
  if (!res) {
    console.log("ERROR READING DATA");
    return 0;
  }
  
  let latestId = await res.data().message;
  latestId = (typeof latestId == "number") ? latestId : 0;
  
  return latestId;
}


//Get latest x amount of messages from firebase
const getSnapshotEssentials = async (roomId) => {
  const latestID = await getLatestId(roomId); 
  
  const messagesRef = collection(db, "links", roomId, "messages");
  const q = query(messagesRef, where("id", ">", latestID))
  
  return {onSnapshot, query: q};
}


//readMessages once
const readMessages = async (roomId, numberOfMessages) => {
  const latestID = await getLatestId(roomId); 
  const neededIds = latestID - (numberOfMessages - 1);
  
  const messagesRef = collection(db, "links", roomId, "messages");
  const q = query(messagesRef, where("id", ">=", neededIds))
  
  let messages = [];
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((message) => {
    messages.push(message.data());
  });
  
  return messages;
}


//Add new Message to cloud
const uploadMessage = async (roomId, message) => {
  let id = message.id;
  if (typeof id == 'number') { 
    await setDoc(doc(db, "links", roomId, "metas", "latestId"), {message: id});
    await setDoc(doc(db, "links", roomId, "messages", message.id.toString()), message); 
  } else {
    console.log("GIVEN ID IS NOT A NUMBER");
  }
}


const auth = getAuth();

const signIn = () => {
  return signInAnonymously(auth);
}

const onSignIn = (f, f2) => {
  setInterval(() => {
    const user = auth.currentUser;
     
    if (user != null) {
      // console.log(user != null && user.displayName != null);
      f(user)
    } else {
      f2(user)
    }
  }, 1000);
  
}

const setDisplayName = (name) => {
  return updateProfile(auth.currentUser, {
    displayName: name
  })
}

const getDisplayName = () => {
  const user = auth.currentUser;
  if (user != null) {
    //console.log("called");
    return user.displayName;
  } else {
    return null;
  }
}

const signOutUser = () => {
  return signOut(auth);
}



export { 
  setNewName,
  newLink,
  getSnapshotEssentials, 
  readMessages, 
  uploadMessage, 
  getLatestId, 
  getServerTimestamp, 
  signIn, 
  onSignIn,
  setDisplayName,
  getDisplayName,
  signOutUser
};
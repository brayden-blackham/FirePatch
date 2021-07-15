import "./styles.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { MyGarden } from "./components/MyGarden";
import { Plant } from "./components/types";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB75Zpvt5Sl5Vt1RcrsPLm7lVMe5RfyuLo",
    authDomain: "firepatchid.firebaseapp.com",
    projectId: "firepatchid",
    storageBucket: "firepatchid.appspot.com",
    messagingSenderId: "1083445804642",
    appId: "1:1083445804642:web:ad1166c110bfcabdaa1b3b",
    measurementId: "G-M52M2MDHYX",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>SignOut</button>
  );
}
export function PlantRow(props: { plant: Plant }) {
  const { commonName, uid } = props.plant;
  const user = auth.currentUser;

  return (
    <>
      {user?.uid === uid && (
        <>
          <p> {commonName}</p>
          <p> {user.displayName}</p>
        </>
      )}
    </>
  );
}

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>
      <section>{user ? <MyGarden /> : <SignIn />}</section>
    </div>
  );
}

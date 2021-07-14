import firebase from "firebase/app";
import React, { useState } from "react";
import { firestore, auth } from "../App";
import { CurrentlyPlanted } from "./CurrentlyPlanted";
import { Plant } from "./types";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function MyGarden() {
  const plantRef = firestore.collection("plants");
  const query = plantRef.orderBy("createdAt").limit(25);

  const [plantsData] = useCollectionData(query, { idField: "id" });
  const plants: Plant[] = plantsData as any;

  const [formValue, setFormValue] = useState("");

  const addPlant = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!auth.currentUser) return;
    const { uid } = auth.currentUser;

    await plantRef.add({
      commonName: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    });

    setFormValue("");
  };

  return (
    <>
      <h1>My Garden</h1>
      <CurrentlyPlanted plants={plants} />
      <h2>Add Plant</h2>
      <form onSubmit={addPlant}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="What did you plant?"
        />
        <button type="submit" disabled={!formValue}>
          <span role="img" aria-label="flower">
            🌻
          </span>
        </button>
      </form>
    </>
  );
}

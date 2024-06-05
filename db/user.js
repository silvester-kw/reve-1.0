import { collection, addDoc, setDoc, doc, query, getDoc } from "firebase/firestore";

import { db } from "@/firebase/db";

// for datatype without using typescript
export const blankUser = {
  id: "",
  name: "",
  bag: [],
  closet: [],
};

export const fieldType = {
  name: "string",
  bag: [
    {
      itemId: "string",
      batch: "number",
    },
  ],
};
export const requiredFields = ["id", "name"];

const createUser = async (user = blankUser) => {
  if (!user || user === blankUser) {
    return null;
  }

  try {
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, user);

    return user;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getUser = async (id) => {
  if (!id) {
    return null;
  }

  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export { createUser };


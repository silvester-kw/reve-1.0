import { collection, addDoc, setDoc, doc, query, getDoc } from "firebase/firestore";

import { db } from "@/firebase/db";
import { getProduct } from "@/db/product";

// for datatype without using typescript
export const blankUser = {
  id: "",
  name: "",
  bag: [],
};

export const fieldType = {
  name: "string",
  bag: [
    {
      itemId: "string",
      batch: [
        "date", // start
        "date", // end
      ],
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

const bagItem = async (userId, itemId, batch) => {
  if (!userId || !itemId) {
    return null;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const user = userDoc.data();
      const bag = user.bag || [];
      bag.push({ itemId, batch });

      user.bag = bag;


      await setDoc(userRef, user);
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

const clearBag = async (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const user = userDoc.data();
      user.bag = [];

      await setDoc(userRef, user);
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

const removeItem = async (userId, itemId) => {
  if (!userId || !itemId) {
    return null;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const user = userDoc.data();
      const bag = user.bag || [];
      const newBag = bag.filter((item) => item.itemId !== itemId);

      user.bag = newBag;

      await setDoc(userRef, user);
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

const getPopulatedBagItems = async (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const user = userDoc.data();
      const bag = user.bag || [];
      const populatedBag = await Promise.all(
        bag.map(async (item) => {
          const product = await getProduct(item.itemId);
          return { ...item, product };
        })
      );

      return populatedBag;
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

export { createUser, getUser, bagItem, clearBag, removeItem, getPopulatedBagItems };


import { collection, addDoc, setDoc, doc, query, getDoc } from "firebase/firestore";

import { db } from "@/firebase/db";

// for datatype without using typescript
export const blankClosetItem = {
  userId: "",
  productId: "",
  batch: 0,
  status: "",
  snapshot: {
    name: "",
    price: 0,
    size: "",
    image: "",
    description: "",
    type: "",
  }
};

export const fieldType = {
  userId: "string",
  productId: "string",
  batch: "number",
  status: "string",
};

export const requiredFields = ["userId", "productId", "batch"];

const createClosetItem = async (closetItem = blankClosetItem) => {
  if (!closetItem || closetItem === blankClosetItem) {
    return null;
  }

  try {
    const closetItemRef = doc(db, "closetItems", closetItem.id);
    await setDoc(closetItemRef, closetItem);

    return closetItem;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getClosetItem = async (id) => {
  if (!id) {
    return null;
  }

  try {
    const closetItemRef = doc(db, "closetItems", id);
    const closetItemDoc = await getDoc(closetItemRef);

    if (closetItemDoc.exists()) {
      return closetItemDoc.data();
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export { createClosetItem, getClosetItem };

import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/db";

import { getUser } from "./user";
import { getProduct } from "./product";

// for datatype without using typescript
export const blankClosetItem = {
  userId: "",
  productId: "",
  batch: 0,
  status: "",
};

export const fieldType = {
  userId: "string",
  productId: "string",
  batch: "number",
  status: "string",
};

export const requiredFields = ["userId", "productId", "batch"];

const addClosetItem = async (userId, productId, batch) => {
  if (!userId || !productId || !batch) {
    throw new Error("userId, productId, and batch are required");
  }

  const closetItemRef = doc(collection(db, "closetItems"));
  const closetItemId = closetItemRef.id;

  const newClosetItem = {
    ...blankClosetItem,
    id: closetItemId,
    userId,
    productId,
    batch,
    status: "active",
  };

  await setDoc(closetItemRef, newClosetItem);

  return newClosetItem;
};

const addClosetItems = async (
  userId,
  items // [{ productId, batch }]
) => {
  if (!userId || !items.length) {
    throw new Error("userId and items are required");
  }

  const closetItemsRef = collection(db, "closetItems");

  const newClosetItems = items.map((item) => {
    return {
      ...blankClosetItem,
      userId,
      productId: item.itemId,
      batch: item.batch,
      status: "active",
    };
  });

  for (const newClosetItem of newClosetItems) {
    await addDoc(closetItemsRef, newClosetItem);
  }

  return newClosetItems;
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

const getClosetItemsByUserId = async (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const closetItemsRef = collection(db, "closetItems");
    const q = query(closetItemsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.batch = data.batch.map((timestamp) => timestamp.toDate());
      return data;
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

const populateClosetItem = async (closetItem) => {
  if (!closetItem) {
    return null;
  }

  const populatedClosetItem = { ...closetItem };

  populatedClosetItem.user = await getUser(closetItem.userId);
  populatedClosetItem.product = await getProduct(closetItem.productId);

  return populatedClosetItem;
};

const populateClosetItems = async (closetItems) => {
  if (!closetItems) {
    return null;
  }

  const populatedClosetItems = [];

  for (const closetItem of closetItems) {
    populatedClosetItems.push(await populateClosetItem(closetItem));
  }

  return populatedClosetItems;
};

const getPopulatedClosetItemsByUserId = async (userId) => {
  if (!userId) {
    return null;
  }

  const closetItems = await getClosetItemsByUserId(userId);

  return await populateClosetItems(closetItems);
};

export {
  addClosetItem,
  getClosetItem,
  getClosetItemsByUserId,
  populateClosetItem,
  populateClosetItems,
  getPopulatedClosetItemsByUserId,
  addClosetItems,
};

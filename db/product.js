import { collection, addDoc, setDoc, doc, query, getDoc, where, getDocs } from "firebase/firestore";

import { db } from "@/firebase/db";
import { uploadFile } from "@/firebase/storage";

// for datatype without using typescript
export const blankProduct = {
  id: "",
  name: "",
  price: 0,
  size: "",
  image: "",
  description: "",
  type: "",
};

export const fieldType = {
  name: "string",
  price: "number",
  size: "string",
  image: "string",
  description: "string",
  type: "string",
};

export const requiredFields = ["name", "price", "size", "image", "description", "type"];

const createProduct = async (product = blankProduct) => {
  if (!product || product === blankProduct) {
    return null;
  }

  try {
    const productRef = doc(collection(db, "products"));
    const productId = productRef.id;

    const imagePath = `/images/products/${productId}`;
    await uploadFile(imagePath, product.image);

    const newProduct = {
      ...product,
      id: productId,
      image: imagePath,
    };

    await setDoc(productRef, newProduct);

    return newProduct;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getProduct = async (id) => {
  if (!id) {
    return null;
  }

  try {
    const productRef = doc(db, "products", id);
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      return productDoc.data();
    } else {
      console.error("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

const getProductsByType = async (type) => {
  if (!type) {
    return null;
  }

  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("type", "==", type));
    const products = await getDocs(q);

    return products.docs.map((doc) => doc.data());
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export { createProduct, getProduct, getProductsByType };

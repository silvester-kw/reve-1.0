import { getFirestore, collection, getDocs } from "firebase/firestore";

let db;

const initializeDb = (app) => {
  if (app && !db) {
    db = getFirestore(app);
  }

  return db;
}

const getCollection = async (collectionName) => {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  const data = snapshot.docs.map((doc) => doc.data());

  return data;
}

export { db, initializeDb, getCollection };

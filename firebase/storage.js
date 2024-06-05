import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

let storage;

const initializeStorage = () => {
  if (!storage) {
    storage = getStorage();
  }

  return storage;
};

const getDownloadUrl = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (e) {
    console.error("Error getting download URL: ", e);
  }
};

const uploadFile = async (path, file) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);

    return true;
  } catch (e) {
    console.error("Error uploading file: ", e);
  }
};

export { storage, initializeStorage, getDownloadUrl, uploadFile };

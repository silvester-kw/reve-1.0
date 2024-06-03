import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCIZOl-CGZPcpJ2lR8cvOT3Onf0aroE5GI",
  authDomain: "reve-aae4c.firebaseapp.com",
  projectId: "reve-aae4c",
  storageBucket: "reve-aae4c.appspot.com",
  messagingSenderId: "119215328872",
  appId: "1:119215328872:web:b4804d6f287d8dd8ab35dd",
  measurementId: "G-19R3KRR300",
};

let app;

const initializeFirebaseApp = () => {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.log(e);
    }
  } else {
    app = getApp();
  }

  return app;
};

export { app, initializeFirebaseApp };

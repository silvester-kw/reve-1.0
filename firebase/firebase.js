import { initializeDb } from "./db";
import { initializeFirebaseApp } from "./app";
import { initializeFirebaseAuth } from "./auth";

let app;
let auth;
let db;

let loaded = false;
let connectionCount = 0;

const initializeFirebase = () => {
  if (loaded) return [ loaded, connectionCount ];

  connectionCount++;

  app = initializeFirebaseApp();
  auth = initializeFirebaseAuth(app);
  db = initializeDb(app);

  loaded = Boolean(app && auth && db);

  return [ loaded, connectionCount ];
};

export { app, auth, db, initializeFirebase };

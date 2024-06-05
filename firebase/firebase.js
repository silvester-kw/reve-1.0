import { initializeDb } from "./db";
import { initializeFirebaseApp } from "./app";
import { initializeFirebaseAuth } from "./auth";
import { initializeStorage } from "./storage";

let app;
let auth;
let db;
let storage;

let loaded = false;
let connectionCount = 0;

const initializeFirebase = () => {
  if (loaded) return [ loaded, connectionCount ];

  connectionCount++;

  app = initializeFirebaseApp();
  auth = initializeFirebaseAuth(app);
  db = initializeDb(app);
  storage = initializeStorage();

  loaded = Boolean(app && auth && db && storage);

  return [ loaded, connectionCount ];
};

export { initializeFirebase };

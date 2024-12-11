import { CONSTANTS } from "../constants";
import { User } from "../models/user.model";
import initDB from "../utils/indexedDB";

export const getUsers = async () => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_STORE, "readonly");
  const store = transaction.objectStore(CONSTANTS.USER_STORE);
  const request = store.getAll();

  return new Promise<User[]>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event);
  });
};

export const addUser = async (user: User): Promise<User> => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_STORE, "readwrite");
  const store = transaction.objectStore(CONSTANTS.USER_STORE);
  store.add(user);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(user);
    transaction.onerror = (event) => reject(event);
  });
};

export const updateUser = async (user: User): Promise<User> => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_STORE, "readwrite");
  const store = transaction.objectStore(CONSTANTS.USER_STORE);
  const request = store.put(user);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(user);
    request.onerror = (event) => reject(event);
  });
};

export const deleteUser = async (id: string) => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_STORE, "readwrite");
  const store = transaction.objectStore(CONSTANTS.USER_STORE);
  const request = store.delete(id);
  return new Promise<void>((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event);
  });
};

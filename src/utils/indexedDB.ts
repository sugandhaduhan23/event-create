import { CONSTANTS } from "../constants";

const dbName = CONSTANTS.DATABASE;
const userStoreName = CONSTANTS.USER_STORE;
const formFieldStoreName = CONSTANTS.USER_FIELDS_STORE;

const createStoresIfNeeded = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(userStoreName)) {
    db.createObjectStore(userStoreName, {
      keyPath: CONSTANTS.ID,
      autoIncrement: true,
    });
  }

  if (!db.objectStoreNames.contains(formFieldStoreName)) {
    db.createObjectStore(formFieldStoreName, {
      keyPath: CONSTANTS.ID,
      autoIncrement: true,
    });
  }
};

const initDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = (event) => reject(event);
    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      createStoresIfNeeded(db);
    };
  });
};

export default initDB;

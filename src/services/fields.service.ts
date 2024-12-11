import { Field } from "../components/DynamicForm";
import { CONSTANTS } from "../constants";
import initDB from "../utils/indexedDB";

export const getFields = async () : Promise<Field[]> => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_FIELDS_STORE, "readonly");
  const store = transaction.objectStore(CONSTANTS.USER_FIELDS_STORE);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event);
  });
};

export const addFields = async (field: Field) : Promise<Field> => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_FIELDS_STORE, "readwrite");
  const store = transaction.objectStore(CONSTANTS.USER_FIELDS_STORE);
  const request = store.add(field);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const id = (event.target as IDBRequest)?.result;
      resolve({ ...field, id });
    };
    request.onerror = (event) => {
      reject((event.target as IDBRequest)?.error);
    };
    transaction.onerror = (event) => {
      reject((event.target as IDBRequest)?.error);
    };
  });
};

export const deleteField = async (id: string) => {
  const db = await initDB();
  const transaction = db.transaction(CONSTANTS.USER_FIELDS_STORE, "readwrite");
  const store = transaction.objectStore(CONSTANTS.USER_FIELDS_STORE);
  const request = store.delete(id);
  return new Promise<void>((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event);
  });
};

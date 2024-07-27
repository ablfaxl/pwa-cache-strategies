import { openDB } from "idb";

const dbPromise = openDB("my-pwa-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("posts")) {
      db.createObjectStore("posts", { keyPath: "id" });
    }
  },
});

export const getFromDB = async <T>(
  storeName: string,
  key: IDBValidKey
): Promise<T | undefined> => {
  const db = await dbPromise;
  return db.get(storeName, key);
};

export const getAllFromDB = async <T>(storeName: string): Promise<T[]> => {
  const db = await dbPromise;
  return db.getAll(storeName);
};

export const putToDB = async <T>(
  storeName: string,
  value: T
): Promise<IDBValidKey> => {
  const db = await dbPromise;
  return db.put(storeName, value);
};

export const clearDB = async (storeName: string): Promise<void> => {
  const db = await dbPromise;
  return db.clear(storeName);
};

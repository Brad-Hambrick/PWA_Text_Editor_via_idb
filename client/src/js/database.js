import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Add to the datbase");
  // connect to DB
  const connectDb = await openDB("jate", 1);
  // Create new transaction
  const tx = connectDb.transaction("jate", "readwrite");
  // Open object store
  const store = tx.objectStore("jate");
  // Pass content into the store
  const request = store.put({ Text: content });
  // confirm content was added to the store
  const result = await request;
  console.log("Successfully saved to the database", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get from the database");
  // Connect to DB
  const connectDb = await openDB("jate", 1);
  //Create new transaction
  const tx = connectDb.transaction("jate", "readonly");
  // Open object store
  const store = tx.objectStore("jate");
  // Get data from DB
  const request = store.getAll();
  // Confirm data was retrieved
  const result = await request;
  console.log("result.value", result);
  return result.value;
};
initdb();

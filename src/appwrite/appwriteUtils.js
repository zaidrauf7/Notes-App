import { ID, Query } from "appwrite";
import { db } from "./config";

export const getUsers = async (query = []) => {
  try {
    const result = await db.listDocuments(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_USER_COLLECTION_ID,
      [Query.orderAsc("name"), ...query]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createProject = async (data) => {
  try {
    const result = await db.createDocument(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_PROJECT_COLLECTION_ID,
      ID.unique(),
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const createTicket = async (data) => {
  try {
    const result = await db.createDocument(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_TICKETS_COLLECTION_ID,
      ID.unique(),
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

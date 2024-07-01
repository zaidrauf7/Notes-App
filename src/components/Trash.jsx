import { db } from "@/appwrite/config";
import { Query } from "appwrite";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuUndo2 } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { RiStickyNoteAddFill } from "react-icons/ri";

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  const fetchTrashedNotes = async () => {
    try {
      const result = await db.listDocuments(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7",
        [Query.equal("trashed", true)] // Collection ID
      );
      setTrashedNotes(result?.documents);
    } catch (err) {
      console.error("Failed to fetch trashed notes:", err);
    }
  };

  useEffect(() => {
    fetchTrashedNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await db.deleteDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        id // Document ID
      );
      // Update state to remove the deleted note
      fetchTrashedNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const moveToTrash = async (id) => {
    try {
      const result = await db.updateDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        id, // Document ID
        { trashed: false } // Update to mark the note as trashed
      );
      if (result) {
        fetchTrashedNotes();
      }
      // Update state to remove the trashed note from the current view
      // dbResult1();
    } catch (err) {
      console.error("Failed to move note to trash:", err);
    }
  };

  return (
    <div>
      <div>
        <h2>Trashed Notes</h2>
      </div>
      <div className="flex w-[800px] overflow-hidden gap-3">
        {trashedNotes.map((val) => (
          <div
            key={val.$id}
            className="w-[200px] h-[300px] relative mt-10 bg-gray-800 hover:bg-gray-700 cursor-pointer flex-col rounded-md flex p-2"
          >
            <h1
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(val.content),
              }}
            />

            <LuUndo2
              className="cursor-pointer text-xl absolute bottom-2 right-10 text-white rounded"
              onClick={() => moveToTrash(val.$id)}
            />
            <HiOutlineTrash
              className="cursor-pointer text-xl absolute bottom-2 right-3 text-white rounded"
              // onClick={() => moveToTrash(val.$id)}
              onClick={() => deleteNote(val.$id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trash;

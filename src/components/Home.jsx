import { account, db } from "@/appwrite/config";
import { Query } from "appwrite";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import UpdateNote from "./UpdateNote";
import { Input } from "./ui/input";

const Home = () => {
  const [storeData1, setStoreData1] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [search, setSearch] = useState("");

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
  ];

  const dbResult1 = async () => {
    try {
      const user = await account.get();

      const result = await db.listDocuments(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7",
        [Query.equal("userId", user?.$id), Query.equal("trashed", false)]
      );

      // Sort results by updatedAt in descending order
      const sortedResults = result.documents.sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));

      setStoreData1(sortedResults);
    } catch (err) {
      console.error(err);
    }
  };

  const searching = async (query) => {
    try {
      const user = await account.get();

      const result1 = await db.listDocuments(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        [Query.equal("userId", user?.$id), Query.contains("content", query)]
      );

      const result2 = await db.listDocuments(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        [Query.equal("userId", user?.$id), Query.contains("tags", query)]
      );

      // Combine results, avoiding duplicates
      const combinedResults = [...new Map([...result1.documents, ...result2.documents].map(item => [item.$id, item])).values()];

      // Sort combined results by updatedAt in descending order
      const sortedResults = combinedResults.sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));

      setStoreData1(sortedResults);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dbResult1();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      searching(search);
    } else {
      dbResult1();
    }
  }, [search]);

  const moveToTrash = async (id) => {
    try {
      const result = await db.updateDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        id, // Document ID
        { trashed: true } // Update to mark the note as trashed
      );
      if (result) {
        dbResult1();
      }
    } catch (err) {
      console.error("Failed to move note to trash:", err);
    }
  };

  return (
    <div className="">
      <Input
        className="w-[300px] mb-10"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <h2>Notes</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/notes">
          <div className="w-[200px] h-[300px] mt-10 bg-gray-800 hover:bg-gray-700 flex-col rounded-md flex justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-green-600 flex justify-center items-center text-black text-4xl">
              <RiStickyNoteAddFill />
            </div>
            <h1 className="font-medium text-lg mt-2">Create New Notes</h1>
          </div>
        </Link>
        {storeData1.length > 0 ? (
          storeData1.map((val, index) => (
            <div
              onClick={() => {
                setOpen(true);
                setCurrentNote(val?.$id);
              }}
              key={val.$id}
              className={`w-[210px] h-[300px] relative mt-10 ${colors[index % colors.length]} bg-opacity-60 hover:bg-opacity-100 cursor-pointer flex-col rounded-md flex p-2`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(val.content),
                }}
              />
              <div className="absolute bottom-8 flex gap-1 text-xs left-2">
                {val.tags.slice(0, 2).map((tag, index) => (
                  <h1 key={index} className="bg-gray-700 text-white p-1 rounded-md">{tag}</h1>
                ))}
                {val.tags.length > 2 && (
                  <h1 className="text-white p-1 rounded-md">+{val.tags.length - 2}</h1>
                )}
              </div>
              <div className="text-gray-100 text-xs mt-2 absolute bottom-2 left-2">
                {val.$updatedAt.slice(0, 10)}
              </div>
              <HiOutlineTrash
                className="cursor-pointer text-xl z-50 absolute bottom-2 right-3 text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  moveToTrash(val.$id);
                }}
              />
            </div>
          ))
        ) : (
          <div className="w-[800px] text-center mt-10 text-gray-400">
            No notes found.
          </div>
        )}
      </div>
      <UpdateNote
        dbResult1={dbResult1}
        open={open}
        id={currentNote}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Home;

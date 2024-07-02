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

      setStoreData1(result.documents);
    } catch (err) {
      console.error(err);
    }
  };

  const searching = async (query) => {
    try {
      const user = await account.get();

      const result = await db.listDocuments(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7",
        [Query.equal("userId", user?.$id), Query.contains("content"|| "tags" ,  query) ]
      );

      setStoreData1(result.documents);
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
  // console.log(storeData1.tags);

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
      <div className="flex flex-wrap   gap-3">
        {storeData1.length > 0 ? (
          storeData1.map((val, index) => (
            // console.log(val.tags);
            <div
              onClick={() => {
                setOpen(true);
                setCurrentNote(val?.$id);
              }}
              key={val.$id}
              className={`w-[200px] h-[300px] relative mt-10 ${colors[index % colors.length]} bg-opacity-60 hover:bg-opacity-100 cursor-pointer flex-col rounded-md flex p-2`}
            >
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(val.content),
                }}
              />
              <div className="absolute  bottom-2 bg-gray-500 rounded-md text-xs p-1 left-2">
                {val.tags}
              </div>
              <div className="text-gray-400 text-xs mt-2 absolute bottom-2 right-10">
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
        <Link to="/notes">
          <div className="w-[200px] h-[300px] mt-10 bg-gray-800 hover:bg-gray-700 flex-col rounded-md flex justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-green-600 flex justify-center items-center text-black text-4xl">
              <RiStickyNoteAddFill />
            </div>
            <h1 className="font-medium text-lg mt-2">Create New Notes</h1>
          </div>
        </Link>
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

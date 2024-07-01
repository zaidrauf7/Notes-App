import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { account, db } from "@/appwrite/config";
import { ID } from "appwrite";
import { Button } from "./ui/button";

const AddNotes = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveNote = async () => {
    setError(null);
    setSuccess(false);
    try {
      const user = await account.get();
      await db.createDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        ID.unique(), // Unique ID for the document
        { content, userId: user?.$id } // Document content
      );
      setContent(""); // Clear the editor content
      setSuccess(true); // Show success message
    } catch (error) {
      setError("Failed to save note");
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="w-full h-auto">
      <div>
        <JoditEditor
          className="prose"
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
        <div className="flex justify-end mt-6">
          <Button onClick={saveNote}>Save</Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2">Note saved successfully!</p>
        )}
      </div>
    </div>
  );
};

export default AddNotes;

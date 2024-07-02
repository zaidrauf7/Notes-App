import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { account, db } from "@/appwrite/config";
import { ID } from "appwrite";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddNotes = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const saveNote = async () => {
    setError(null);
    setSuccess(false);
    try {
      const user = await account.get();
      await db.createDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        ID.unique(), // Unique ID for the document
        { content, tags, userId: user?.$id } // Document content
      );
      // Clear the editor content and tags
      setContent("");
      setTags([]);
      // Show success message
      setSuccess(true);
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
        <div className="flex justify-between mt-6 ">
          <div className="flex gap-4">
          <Input
            placeholder="Add Tag"
            className="w-[300px]"
            onChange={(e) => setTagInput(e.target.value)}
            value={tagInput}
          />
          <Button onClick={addTag}>Add Tag</Button>
          </div>
          <Button onClick={saveNote}>Save</Button>
        </div>
        <div className="mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
              <button
                className="ml-2 text-red-500"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
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

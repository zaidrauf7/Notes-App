import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { account, db } from "@/appwrite/config";
import { ID } from "appwrite";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Editor } from "@tinymce/tinymce-react";

const AddNotes = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(""); // State to store the selected label

  const editorRef = useRef(null);

  const Labels = ["Pending", "Processing", "Complete", "Notes"];

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
    const editorContent = editorRef.current.getContent();
    try {
      const user = await account.get();
      await db.createDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        ID.unique(), // Unique ID for the document
        {
          content: editorContent,
          tags,
          label: selectedLabel,
          userId: user?.$id,
        } // Document content
      );
      // Clear the editor content, tags, and label
      setTags([]);
      setSelectedLabel("");
      // Show success message
      setSuccess(true);
      editorRef.current.value = "";
    } catch (error) {
      setError("Failed to save note");
      console.error("Error saving note:", error);
    }
  };
  // if (editorRef.current) {
  //   console.log(editorRef.current.getContent());
  // }
  return (
    <div className="w-full h-auto">
      <div>
        {/* <JoditEditor
          className="prose"
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        /> */}
        <Editor
          apiKey="qc0atgiau89i17kxlifcuujmzyrv33l6p7y78s9cl12ko5wk"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks wordcount | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help image media | preview fullscreen code table links anchor advlist lists charmap searchreplace visualblocks",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background: #141414; color: white }",
          }}
        />
        <div className="flex justify-between  items-center bg-[#141414] p-1 rounded-md ">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Add Tag"
              className="w-[300px] bg-transparent"
              onChange={(e) => setTagInput(e.target.value)}
              value={tagInput}
            />
            <Button className="bg-[#606060] text-gray-200" onClick={addTag}>Add Tag</Button>
          </div>
          <div className="flex items-center">
            <select
              className="bg-[#606060] px-2 py-1 rounded-md"
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)} // Update the selected label state
            >
              <option value="" disabled>
                Select a label
              </option>
              {Labels.map((val, key) => (
                <option key={key} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
          <Button className="bg-[#606060] text-gray-200" onClick={saveNote}>Save</Button>
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

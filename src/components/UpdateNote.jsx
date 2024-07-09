import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { account, db } from "@/appwrite/config";
import { ID } from "appwrite";
import { Button } from "./ui/button";
import { Editor } from "@tinymce/tinymce-react";

const UpdateNote = ({ open, id, setOpen, dbResult1 }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const getDoc = async () => {
    setLoading(true);
    const singleDoc = await db.getDocument(
      "666305ca001c5404a618",
      "666305dd00255a0776a7",
      id
    );
    setContent(singleDoc?.content);
    setLoading(false);
  };

  useEffect(() => {
    getDoc();
  }, [id, open]);

  const saveNote = async () => {
    setError(null);
    setSuccess(false);
    try {
      const editorContent = editorRef.current.getContent();

      await db.updateDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        id, // Unique ID for the document
        { content: editorContent } // Document content
      );
      setSuccess(true); // Show success message
      dbResult1();
      setOpen();
    } catch (error) {
      setError("Failed to save note");
      console.error("Error saving note:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"max-w-[70%]"}>
        <DialogHeader>
          <DialogDescription>
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
                  initialValue={loading ? "Loading..." : content}
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
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif;} html {zIndex: 999999;}",
                  }}
                />
                <div className="flex justify-end mt-6">
                  <Button onClick={saveNote}>Save</Button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && (
                  <p className="text-green-500 mt-2">
                    Note saved successfully!
                  </p>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNote;

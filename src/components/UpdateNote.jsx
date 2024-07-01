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

const UpdateNote = ({ open, id, setOpen, dbResult1 }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getDoc = async () => {
    const singleDoc = await db.getDocument(
      "666305ca001c5404a618",
      "666305dd00255a0776a7",
      id
    );
    setContent(singleDoc?.content);
  };

  useEffect(() => {
    getDoc();
  }, [id]);

  const saveNote = async () => {
    setError(null);
    setSuccess(false);
    try {
      await db.updateDocument(
        "666305ca001c5404a618", // Database ID
        "666305dd00255a0776a7", // Collection ID
        id, // Unique ID for the document
        { content } // Document content
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

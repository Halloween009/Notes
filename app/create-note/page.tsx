"use client";

import CustomInput from "../../components/CustomInput";
import CustomDropdown from "../../components/CustomDropdown";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Category, NoteType } from "@/types/types";
import { useRouter } from "next/navigation";

const CustomForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("frontend");
  const [type, setType] = useState("note");
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    const newNote = {
      id: Date.now().toString(),
      title,
      description,
      category: category as Category,
      type: type as NoteType,
      url,
      createdAt: new Date().toLocaleDateString(),
    };
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    setTitle("");
    setDescription("");
    setUrl("");
    router.push("/home");
  };

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-3xl mt-4 text-white">Creating new note</h1>
      <form className="text-black flex flex-col gap-3 w-3xl align-middle mx-auto p-10 rounded-2xl">
        <CustomInput
          name="title"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <CustomInput
          name="description"
          value={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <CustomDropdown
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: "frontend", children: "Frontend" },
            { value: "backend", children: "Backend" },
            { value: "career", children: "Career" },
            { value: "other", children: "Other" },
          ]}
        />
        <CustomDropdown
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { value: "note", children: "Note" },
            { value: "link", children: "Link" },
          ]}
        />
        {type === "link" && (
          <CustomInput
            name="url"
            value={url}
            placeholder="Enter url"
            onChange={(e) => setUrl(e.target.value)}
          />
        )}
        <CustomButton onClick={handleAdd}>Add note</CustomButton>
      </form>
    </div>
  );
};

export default CustomForm;

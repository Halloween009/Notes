"use client";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      alert("ошибка:" + data.error);
    } else router.push("/home");
  };
  return <CustomButton onClick={handleDelete}>Delete note</CustomButton>;
};

export const SearchInput = () => {
  const [title, setTitle] = useState("");

  return (
    <CustomInput
      name="search"
      value={title}
      placeholder="Search"
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

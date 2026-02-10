"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Note } from "@/types/types";
import CustomDropdown from "./CustomDropdown";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import Pagination from "./Pagination";

const NotesList = ({ notes }: { notes: Note[] }) => (
  <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 ">
    {notes.map((note) => (
      <Link href={`notes/${note.id}`} key={note.id}>
        <div className="border-2 px-2 py-7 rounded-2xl bg-white  text-black min-w-50">
          <p>{note.title}</p>
          <p>Category:{note.category}</p>
          <p>Created:{note.createdAt}</p>
        </div>
      </Link>
    ))}
  </div>
);

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [category, setCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState<Note[]>([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 16;

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (Array.isArray(data)) setNotes(data);
      else {
        setNotes([]);
      }
    };
    fetchNotes();
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterNotes =
    category === "all"
      ? notes
      : notes.filter((note) => note.category === category);

  const handleSearch = () => {
    const searchRes = filterNotes.filter((note) =>
      note.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFound(searchRes);
    setSearchValue("");
    setSearched(true);
  };

  const notesToShow = found.length > 0 ? found : filterNotes;
  const totalPages = Math.ceil(notesToShow.length / limit);
  const paginatedNotes = notesToShow.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category, found]);

  return (
    <div className="flex flex-col w-3/4 items-center">
      <div className="flex flex-row items-center gap-6 m-8">
        <CustomInput
          name="search"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <CustomDropdown
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: "all", children: "All" },
            { value: "frontend", children: "Frontend" },
            { value: "backend", children: "Backend" },
            { value: "career", children: "Career" },
            { value: "other", children: "Other" },
          ]}
        />
        <CustomButton onClick={handleSearch}>Search</CustomButton>
      </div>
      <div className="flex p-5 flex-col gap-4">
        {found.length === 0 && searched ? (
          <div>Ничего не найдено</div>
        ) : (
          <NotesList notes={paginatedNotes} />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Notes;

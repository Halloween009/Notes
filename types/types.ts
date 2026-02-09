export type Category = "frontend" | "backend" | "career" | "other" | "all";
export type NoteType = "note" | "link";

export interface Note {
  id: string;
  title: string;
  description: string;
  category: Category;
  type: NoteType;
  url?: string;
  createdAt: string;
}

export interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export interface CustomInputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface CustomDropdownProps {
  name: string;
  value: string;
  options: { value: string; children: React.ReactNode }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export type NoteContextProps = {
  notes: Note[];
  addNote: (note: Note) => void;
};
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

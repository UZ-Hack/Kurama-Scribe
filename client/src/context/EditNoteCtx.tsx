import React, { createContext, useContext, useState, ReactNode } from "react";

interface EditNoteContextType {
  id: string;
  title: string;
  description: string;
  setNote: (id: string, title: string, description: string) => void;
  isEditNoteOpen: boolean;
  toggleEditNote: () => void;
}

const EditNoteContext = createContext<EditNoteContextType | undefined>(undefined);

export const useEditNoteContext = () => {
  const context = useContext(EditNoteContext);
  if (!context) {
    throw new Error("useEditNoteContext must be used within an EditNoteProvider");
  }
  return context;
};

interface EditNoteProviderProps {
  children: ReactNode;
}

export const EditNoteProvider: React.FC<EditNoteProviderProps> = ({ children }) => {
  const [note, setNote] = useState({ id: "", title: "", description: "" });
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);

  const setNoteData = (id: string, title: string, description: string) => {
    setNote({ id, title, description });
  };

  const toggleEditNote = () => {
    setIsEditNoteOpen((prevState) => !prevState);
  };

  return (
    <EditNoteContext.Provider value={{ ...note, setNote: setNoteData, isEditNoteOpen, toggleEditNote }}>
      {children}
    </EditNoteContext.Provider>
  );
};

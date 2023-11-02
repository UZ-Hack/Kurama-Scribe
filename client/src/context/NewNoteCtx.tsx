/** @format */

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NewNoteContextType {
  isNewNoteOpen: boolean;
  toggleNewNote: () => void;
}

const NewNoteContext = createContext<NewNoteContextType | undefined>(undefined);

export const useNewNoteContext = () => {
  const context = useContext(NewNoteContext);
  if (!context) {
    throw new Error("useNewNoteContext must be used within a NewNoteProvider");
  }
  return context;
};

interface NewNoteProviderProps {
  children: ReactNode;
}

export const NewNoteProvider: React.FC<NewNoteProviderProps> = ({
  children,
}) => {
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);

  const toggleNewNote = () => {
    setIsNewNoteOpen((prevState) => !prevState);
  };

  return (
    <NewNoteContext.Provider value={{ isNewNoteOpen, toggleNewNote }}>
      {children}
    </NewNoteContext.Provider>
  );
};

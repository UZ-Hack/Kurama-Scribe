/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiPencilAlt } from "react-icons/hi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSearch } from "../context/SearchCtx";
import { useNewNoteContext } from "../context/NewNoteCtx";
import { useEditNoteContext } from "../context/EditNoteCtx";

interface INotes {
  id: string;
  title: string;
  description: string;
  isFavorited: boolean;
}

const NotesPage: React.FC = () => {
  const { searchQuery } = useSearch();
  const [notes, setNotes] = useState<INotes[]>([]);
  const { toggleNewNote } = useNewNoteContext();
  const { toggleEditNote, setNote } = useEditNoteContext();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const access_token = localStorage.getItem("Authorization");
        const response = await axios.get(`http://localhost:6972/notes`, {
          headers: { Authorization: access_token },
        });

        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    getNotes();
  }, [toggleNewNote, toggleEditNote]);

  const handleFavorite = async (id: string) => {
    try {
      const options = {
        method: "PATCH",
        url: `http://localhost:6972/notes/favorite/${id}`,
      };

      await axios.request(options);

      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              isFavorited: !note.isFavorited,
            };
          }
          return note;
        });
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleEdit = (id: string, title: string, description: string) => {
    setNote(id, title, description);
    toggleEditNote();
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:6972/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className='flex gap-6 justify-between flex-wrap mt-3 mx-auto max-w-2xl w-full'>
      <div className='flex gap-6 justify-between max-[704px]:justify-center flex-wrap h-[70vh] w-full overflow-y-auto pb-10 z-30'>
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((note) => (
            <div
              key={note.id}
              className='flex flex-col justify-between p-3 rounded-2xl text-white h-64 max-w-[320px] w-full bg-field-dark text-light'
            >
              <div>
                <div className='flex items-start gap-3 justify-between'>
                  <h3 className='text-lg'>{note.title}</h3>
                  <button onClick={() => handleFavorite(note.id)}>
                    {note.isFavorited ? (
                      <AiFillHeart size='18' />
                    ) : (
                      <AiOutlineHeart size='18' />
                    )}
                  </button>
                </div>
                <br />
                <p className='line-clamp-5'>{note.description}</p>
              </div>
              <div className='flex ml-auto gap-3'>
                <button
                  onClick={() =>
                    handleEdit(note.id, note.title, note.description)
                  }
                >
                  <HiPencilAlt size='18' />
                </button>
                <button onClick={() => handleDelete(note.id)}>
                  <BsFillTrashFill size='18' />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotesPage;

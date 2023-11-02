/** @format */

import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { useNewNoteContext } from "../context/NewNoteCtx";

interface NoteData {
  title: string;
  description: string;
  isFavorited: boolean;
}

const Note: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toggleNewNote } = useNewNoteContext();

  const onSubmit = async (data: NoteData) => {
    try {
      const access_token = localStorage.getItem("Authorization");

      const options = {
        method: "POST",
        url: "http://localhost:6972/notes",
        data: {
          title: data.title,
          description: data.description,
          isFavorited: false,
        },
        headers: { Authorization: access_token },
      };

      await axios.request(options);

      toggleNewNote();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-[477px]:max-w-sm max-[414px]:max-w-xs w-full z-50 p-5 bg-dark rounded-md'>
      <FaXmark
        size='20'
        className='text-field-light ml-auto cursor-pointer'
        onClick={toggleNewNote}
      />
      <h2 className='text-center text-2xl font-bold text-field-light z-20'>
        New Note
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 mt-10'
      >
        <div className='flex flex-col gap-2'>
          <input
            type='text'
            placeholder='Title'
            className='outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className='flex items-center gap-1 text-red-500 text-sm italic'>
              <AiOutlineExclamationCircle /> Title is required
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <textarea
            placeholder='Description'
            className='outline-none h-52 resize-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <span className='flex items-center gap-1 text-red-500 text-sm italic'>
              <AiOutlineExclamationCircle /> Description is required
            </span>
          )}
        </div>

        <button
          type='submit'
          className='p-3 bg-primary text-field-light hover:bg-opacity-70 text-white rounded-md mt-10'
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Note;

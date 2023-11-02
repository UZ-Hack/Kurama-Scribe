/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { useEditNoteContext } from "../context/EditNoteCtx";
import axios from "axios";
import { BsExclamationTriangle } from "react-icons/bs";

interface EditNote {
  title: string;
  description: string;
}

const EditNote: React.FC = () => {
  const { id, title, description, toggleEditNote } = useEditNoteContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNote>({
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit = async (data: EditNote) => {
    try {
      const options = {
        method: "PATCH",
        url: `http://localhost:6972/notes/update/${id}`,
        data: {
          title: data.title,
          description: data.description,
        },
      };

      await axios.request(options);

      toggleEditNote();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-[477px]:max-w-sm max-[414px]:max-w-xs w-full z-50 p-5 bg-dark rounded-md'>
      <FaXmark
        size='20'
        className='text-field-light ml-auto cursor-pointer'
        onClick={toggleEditNote}
      />
      <h2 className='text-center text-2xl font-bold text-field-light z-20'>
        Edit Note
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 mt-10'
      >
        <div className='flex flex-col gap-2'>
          <input
            type='text'
            placeholder='Title'
            {...register("title", { required: true })}
            className='outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
          />
          {errors.title && (
            <span className='flex items-center gap-1 text-red-500 text-sm italic'>
              <BsExclamationTriangle /> Title is required
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <textarea
            placeholder='Description'
            {...register("description", {
              required: "Description is required",
            })}
            className='outline-none h-52 resize-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
          ></textarea>
          {errors.description && (
            <span className='flex items-center gap-1 text-red-500 text-sm italic'>
              <BsExclamationTriangle /> Description is required
            </span>
          )}
        </div>

        <button
          type='submit'
          className='p-3 bg-primary text-field-light hover:bg-opacity-70 text-white rounded-md mt-10'
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditNote;

/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BsExclamationTriangle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { MdLogout } from "react-icons/md";

interface IUser {
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const access_token = localStorage.getItem("Authorization");
      const response = await axios.get(`http://localhost:6972/auth/profile`, {
        headers: { Authorization: access_token },
      });

      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = async (data: IUser) => {
    try {
      const access_token = localStorage.getItem("Authorization");
      await axios.patch("http://localhost:6972/auth/update", data, {
        headers: { Authorization: access_token },
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    window.location.reload()
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen mx-auto max-w-2xl w-full z-20'>
      <button>
        <MdLogout
          onClick={handleLogout}
          size='25'
          className='absolute z-20 text-light top-10 right-10'
        />
      </button>
      <Link to='/main/notes' className='z-20'>
        <img className='z-20 w-32 my-10' src={logo} alt='Logo' />
      </Link>
      <h2 className='text-center text-2xl font-bold text-field-light z-20'>
        Profile
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-1 px-5 py-7 w-full z-20'
      >
        <div className='flex flex-col gap-2 mb-4'>
          <input
            type='text'
            placeholder='Username'
            defaultValue={username}
            {...register("username", { required: true })}
            className='outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
          />
          {errors.username && (
            <span className='flex text-error items-center gap-1 text-red-500 text-sm italic'>
              <BsExclamationTriangle /> Username is required
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <input
            type='text'
            placeholder='Email'
            defaultValue={email}
            {...register("email", { required: true })}
            className='outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
          />
          {errors.email && (
            <span className='flex text-error items-center gap-1 text-red-500 text-sm italic'>
              <BsExclamationTriangle /> Email is required
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

export default Profile;

/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { BsExclamationTriangle } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";


interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await trigger("username");
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await trigger("email");
  };

  const handlePasswordChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await trigger("password");
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:6972/auth/register",
        data
      );

      localStorage.setItem("Authorization", response.data.access_token);
      window.location.reload()
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Username is already taken");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen mx-auto max-w-[460px] w-full z-20'>
      <img className='z-20 w-32 my-10' src={logo} alt='Logo' />
      <h2 className='text-center text-2xl font-bold text-field-light z-20'>
        Create account
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-1 px-5 py-7 w-full z-20'
      >
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <div className='mb-4'>
              <input
                {...field}
                type='text'
                className='outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
                placeholder='Username'
                onChange={(e) => {
                  field.onChange(e);
                  handleUsernameChange(e);
                }}
              />
              {errors.username && (
                <p className='text-error mt-2 text-sm flex items-center gap-1'>
                  <BsExclamationTriangle />
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className='text-error mt-2 text-sm flex items-center gap-1'>
                  <BsExclamationTriangle />
                  {error}
                </p>
              )}
            </div>
          )}
          rules={{
            required: "Username is required",
            minLength: {
              value: 2,
              message: "Username must be at least 2 characters long",
            },
          }}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <div className='mb-4'>
              <input
                {...field}
                type='text'
                className='outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'
                placeholder='Email'
                onChange={(e) => {
                  field.onChange(e);
                  handleEmailChange(e);
                }}
              />
              {errors.email && (
                <p className='text-error mt-2 text-sm flex items-center gap-1'>
                  <BsExclamationTriangle />
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <div className='flex p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                className='outline-none w-full mr-2 bg-transparent text-field-light'
                placeholder='Password'
                onChange={(e) => {
                  field.onChange(e);
                  handlePasswordChange(e);
                }}
              />
            )}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />
          <button
            type='button'
            className='w-5 text-field-light'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {errors.password && (
          <p className='text-error mt-2 text-sm flex items-center gap-1'>
            <BsExclamationTriangle />
            {errors.password.message}
          </p>
        )}
        <button
          type='submit'
          className='p-3 bg-primary text-field-light hover:bg-opacity-70 text-white rounded-lg mt-10'
        >
          Register
        </button>
      </form>
      <span className='text-field-light'>
        Already have an account?{" "}
        <Link to='/login' className='text-primary'>
          Login
        </Link>
      </span>
    </div>
  );
};

export default Register;

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
  password: string;
}

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:6972/auth/login",
        data
      );

      localStorage.setItem("Authorization", response.data.access_token);
      onLoginSuccess(response.data.access_token);
      navigate("/main/notes");
    } catch (error) {
      console.error("Error logging user:", error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen mx-auto max-w-[460px] w-full z-20'>
      <img className='z-20 w-32 my-10' src={logo} alt='Logo' />
      <h2 className='text-center text-2xl font-bold text-field-light z-20'>
        Hello, Welcome! &#128075;
      </h2>
      <p className='z-20 text-error'>{errorMessage}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-1 px-5 pb-7 pt-3 w-full z-20'
      >
        <p></p>
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
              />
              {errors.username && (
                <p className='text-error mt-2 text-sm flex items-center gap-1'>
                  <BsExclamationTriangle />
                  {errors.username.message}
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
        <div className='flex p-3 w-full rounded-md bg-field-dark shadow-[0px_35px_50px_-15px_#00000080]'>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                className='outline-none w-full mr-2 bg-transparent text-field-light'
                placeholder='Password'
              />
            )}
            rules={{
              required: "Password is required",
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
          className='p-3 bg-primary text-field-light hover:bg-opacity-70 text-white rounded-md mt-10'
        >
          Login
        </button>
      </form>
      <span className='text-field-light'>
        Don't have an account yet?{" "}
        <Link to='/register' className='text-primary'>
          Create account
        </Link>
      </span>
    </div>
  );
};

export default Login;

/** @format */

// App.tsx
import React, { useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";
import Note from "./components/Note";
import FavoritesPage from "./components/Favorites";
import NotesPage from "./components/Notes";
import { useNewNoteContext } from "./context/NewNoteCtx";
import { useEditNoteContext } from "./context/EditNoteCtx";
import EditNote from "./components/EditNote";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { MdLogout } from "react-icons/md";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("Authorization")
  );
  const { isNewNoteOpen, toggleNewNote } = useNewNoteContext();
  const { isEditNoteOpen, toggleEditNote } = useEditNoteContext();

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <>
      <div className='bg-dark h-screen'>
        <div className='h-1/3 w-full [background:linear-gradient(180deg,rgb(54.77,15.7,188.75)_0%,rgb(163.5,35.49,148.54)_100%)] absolute'></div>
        <div className='h-1/3 w-full bg-dark-image absolute'></div>
        {isNewNoteOpen && (
          <div className='absolute h-screen w-screen'>
            <div
              onClick={toggleNewNote}
              className='absolute bg-dark-overlay h-screen w-screen z-40'
            ></div>
            <Note />
          </div>
        )}

        {isEditNoteOpen && (
          <div className='absolute h-screen w-screen'>
            <div
              onClick={toggleEditNote}
              className='absolute bg-dark-overlay h-screen w-screen z-40'
            ></div>
            <EditNote />
          </div>
        )}
        <div className='mx-5'>
          <Routes>
            <Route
              path='/register'
              element={token ? <Navigate to='/main/notes' /> : <Register />}
            />
            <Route
              path='/'
              element={
                token ? <Navigate to='/main/notes' /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/login'
              element={
                token ? (
                  <Navigate to='/main/notes' />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route path='/profile' element={<Profile />} />

            <Route
              path='/main/*'
              element={
                token ? (
                  <>
                    <Main />
                    <Routes>
                      <Route path='/notes' element={<NotesPage />} />
                      <Route path='/favorites' element={<FavoritesPage />} />
                      <Route path='/new-note' element={<Note />} />
                    </Routes>
                  </>
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;

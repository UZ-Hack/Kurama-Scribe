/** @format */

import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchCtx";
import { useNewNoteContext } from "../context/NewNoteCtx";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Main: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { toggleNewNote } = useNewNoteContext();
  const navigate = useNavigate()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    window.location.reload()
  };

  return (
    <div className='flex flex-col justify-center mx-auto pt-20 max-w-2xl w-full z-30'>
      <button>
        <MdLogout
          onClick={handleLogout}
          size='25'
          className='absolute z-20 text-light top-10 right-10'
        />
      </button>
      <div className='flex gap-5'>
        <div className='z-20 flex items-center gap-2 outline-none p-3 w-full rounded-md bg-field-dark text-field-light shadow-[0px_35px_50px_-15px_#00000080]'>
          <BiSearch className='w-5' />
          <input
            type='text'
            className='bg-transparent w-full outline-none'
            placeholder='Search ...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Link
          to='/profile'
          className='flex justify-center items-center w-14 bg-field-dark rounded-md z-20'
        >
          <FaUserAlt className='text-light' />
        </Link>
      </div>
      <div className='flex justify-between my-5 items-start text-field-light'>
        <div className='flex gap-5 items-center z-20'>
          <NavLink
            to='/main/notes'
            className={({ isActive }) =>
              isActive
                ? "flex justify-center items-center h-8 w-36 bg-light text-primary rounded-md"
                : "flex justify-center items-center h-8 w-36 bg-field-dark rounded-md"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to='/main/favorites'
            className={({ isActive }) =>
              isActive
                ? "flex justify-center items-center h-8 w-36 bg-light text-primary rounded-md"
                : "flex justify-center items-center h-8 w-36 bg-field-dark rounded-md"
            }
          >
            Favorites
          </NavLink>
        </div>
        <button
          onClick={toggleNewNote}
          className='z-[35] max-[400px]:absolute max-[400px]:bottom-5 max-[400px]:right-5 flex justify-center items-center h-8 w-8 bg-field-dark max-[400px]:bg-primary text-field-light shadow-[0px_35px_50px_-15px_#00000080] rounded-md'
        >
          <AiOutlinePlus className='w-5' />
        </button>
      </div>
    </div>
  );
};

export default Main;

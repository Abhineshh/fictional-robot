import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Logout() {
 
const navigate = useNavigate(); 

const username = localStorage.getItem("token")
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (e.target.closest('.dropdown-container')) return;
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  function logout(){
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
    
        <div className="relative inline-block text-left dropdown-container">
          <div>
            <button
              type="button"
              className="bg-taksha_purple p-2 px-3 h-[50px] flex text-taksha_grey items-center gap-1 rounded-3xl"
              id="options-menu"
              onClick={toggleDropdown}
            >
              {username}
            </button>
          </div>

          {isOpen && (
            <div className="origin-top-right absolute right-1 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
              <div className="py-4 flex justify-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  className='flex justify-center text-indigo1 text-xl font-bold'
                  onClick={() => { logout(); }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      
    </div>
  );
}

export default Logout;

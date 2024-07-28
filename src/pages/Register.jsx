import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../APIutils/';
import axios from 'axios';


function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    adminname: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, adminname, email } = values;
    if (adminname.length < 3) {
      toast.error(
        "adminname should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        const data  = await axios.post(registerRoute, values);
        console.log("done")
        if (data.data.status === false) {
          toast.error(data.data.msg );
        }
        console.log(data)
        if (data.data.status === true) {
          localStorage.setItem(
            "token",
            values.adminname
          );
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className='h-screen'>
      <div className='h-full w-screen flex flex-col justify-center gap-4 items-center'>
        <div className='fixed top-0 left-0 right-0 bg-charcoal text-text h-12 flex justify-between bg-grey'>
          <div className='flex justify-center items-center m-6 md:text-2xl text-white font-extrabold'>
            Employee Management System
          </div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-grey pt-10 pb-20 px-14 md:px-20 min-w-max border-2 border-indigo2 mt-16'>
          <div className='flex items-center g-4 justify-center'>
            <h1 className='text-indigo1 text-5xl font-extrabold uppercase'>REGISTER</h1>
          </div>
          <input
            type='text'
            placeholder='name'
            name='adminname'
            onChange={handleChange}
            autoComplete='adminname'
            className='p-2 border-2 w-full text-base focus:border-2 focus:outline-none rounded'
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            autoComplete='email'
            className='p-2 border-2 w-full text-base focus:border-2 focus:outline-none rounded'
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            autoComplete='new-password'
            className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
          />

          <button
            type='submit'
            className='bg-indigo2 py-6 font-bold cursor-pointer text-white uppercase hover:bg-opacity-45 p-1 text-base active:bg-white active:text-black focus:outline-none rounded-2xl'
          >
            REGISTER
          </button>
          <div className='flex justify-end text-indigo2 font-bold'>
            <Link to="/login">lOGIN</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Register
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../APIutils';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
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

  const validateForm = () => {
    const { email, password } = values;
    if (email === "" || password === "") {
      toast.error("Email and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateForm()) {
        const data  = await axios.post(loginRoute, values);
        console.log(data)
        if (data.data.status === false) {
          toast.error(data.data.msg );
        }
        
        if (data.data.status === true) {
          localStorage.setItem(
            "token",
            data.data.adminname
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
            <h1 className='text-indigo1 text-5xl font-extrabold uppercase'>LOGIN</h1>
          </div>
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
            Login
          </button>
          <div className='flex justify-end text-indigo2 font-bold'>
            <Link to="/register">Register</Link>
          </div>
        </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default Login;

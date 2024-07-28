import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { createEmployeeRoute } from '../APIutils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeCreate() {
  const [formData, setFormData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    gender: '',
    designation: '',
    courses: [],
    imagefile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedCourses = checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value);
        return { ...prevData, courses: updatedCourses };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagefile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'courses') {
        formData.courses.forEach((course) => formDataToSend.append('courses', course));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(createEmployeeRoute, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
      if(true){
        toast.success("Employee data uploaded successfully")
      }
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error uploading data:', error);
      toast.error("Employee is already registered")
    }
  };

  return (
    <div>
      <Navbar />
      <div className='border-2 border-indigo1 w-full p-4'>
        <ToastContainer/>
        <div className='w-full flex justify-center items-center h-14 text-2xl font-extrabold text-indigo2'>
          <h1>Create New Employee</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-grey pt-10 pb-20 px-14 lg:px-20 border-2 border-indigo2 md:mx-40'>
          <div>
            <input
              type="text"
              placeholder="Enter Employee Name"
              name="name"
              pattern="[a-zA-Z]{4,}"
              value={formData.name}
              onChange={handleChange}
              required
              className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Employee Phone Number"
              name="phonenumber"
              pattern="[0-9]{10}"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter Employee Email"
              name="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              value={formData.email}
              onChange={handleChange}
              required
              className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
            />
          </div>
          <div className='mb-4 flex gap-4 '>
            <label>Gender :</label>
            <div className='flex gap-2'>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                required
              /> Male
            </div>
            <div className='flex gap-2'>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                required
              /> Female
            </div>
          </div>
          <div>
            <label>Select Employee Designation: </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
            >
              <option value="">Select Designation</option>
              <option value="software">Software Engineer</option>
              <option value="manager">Manager</option>
              <option value="hr">HR Manager</option>
              <option value="accountant">Accountant</option>
              <option value="itmanager">IT manager</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label>Course / Education</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='courses'
                value="BCA"
                checked={formData.courses.includes('BCA')}
                onChange={handleChange}
              /> BCA
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='courses'
                value="MCA"
                checked={formData.courses.includes('MCA')}
                onChange={handleChange}
              /> MCA
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='courses'
                value="BSC"
                checked={formData.courses.includes('BSC')}
                onChange={handleChange}
              /> BSC
            </div>
          </div>
          <div className='flex flex-col'>
            <label>Passport Picture of the Employee</label>
            <input
              type='file'
              name='imagefile'
              onChange={handleFileChange}
              required
              className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-indigo2 hover:bg-indigo1 hover:text-white active:bg-grey p-4 px-8'
            >Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeCreate;

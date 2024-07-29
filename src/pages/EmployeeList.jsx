import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { deleteEmployeeRoute, getEmployeeListRoute, searchEmployeeListRoute } from '../APIutils';

function EmployeeList() {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    gender: '',
    designation: '',
    courses: [],
  });

  // Function to load data from the server
  const loadData = async () => {
    try {
      const response = await axios.get(getEmployeeListRoute);
      setTableData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // useEffect to load data on component mount
  useEffect(() => {
    loadData();
  }, []);

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

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get(searchEmployeeListRoute, {
        params: formData,
      });
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(deleteEmployeeRoute, {
        params: { _id:id }
      });
      setTableData((prevData) => prevData.filter((employee) => employee._id !== id));
      toast.success('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting the data', error);
      toast.error('Error deleting employee');
    }
  };

  function editEmployeeFunc(empData){
    navigate("/empedit", {state: empData})
  }

  return (
    <div>
      <Navbar />
      <div className='w-full p-1 h-[90vh]'>
        <div className='w-full flex justify-center items-center h-8 text-2xl font-extrabold text-indigo2'>
          <h1>Employee List</h1>
        </div>
        <div className='flex md:flex-row flex-col md:justify-between items-center w-full md:h-fit h-fit p-4 gap-2'>
          <div>Total Employee Count: {tableData.length}</div>
          <div>
            <form onSubmit={handleSearch} className='md:flex md:flex-wrap md:gap-6 p-2 justify-center border-2 border-indigo2'>
              <div className='text-indigo2 bg-grey p-1 text-3xl'>
                Filter Search
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  name="name"
                  pattern="[a-zA-Z]{4,}"
                  value={formData.name}
                  onChange={handleChange}
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
                  className='p-2 border-2 w-full text-base focus:border-2 focus:outline-2 outline-indigo1 rounded'
                />
              </div>
              <div className='mb-4 flex gap-4 items-center'>
                <label>Gender :</label>
                <div className=''>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  /> Male
                </div>
                <div className=''>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  /> Female
                </div>
              </div>
              <div>
                <label>Select Employee Designation: </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
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
                <div className='flex gap-4'>
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
              </div>

              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='bg-indigo2 hover:bg-indigo1 hover:text-white active:bg-grey h-fit py-2 px-8'
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div>
            <Link to={"/empcreate"} className='m-1'>
              <button className='p-3 bg-indigo2'>Create New Employee</button>
            </Link>
          </div>
        </div>
        <div className='border-2 border-indigo2 w-full p-1 md:overflow-auto overflow-scroll min-h-[68vh] md:min-h-[73vh]'>
          {tableData.length ? (
            <table className='border-2 border-solid border-grey w-full text-xs'>
              <thead className='bg-slate-400'>
                <tr>
                  <th className='border-2 text-center'>ID</th>
                  <th className='border-2 text-center '>Image</th>
                  <th className='border-2 text-center '>Name</th>
                  <th className='border-2 text-center '>Email</th>
                  <th className='border-2 text-center w-fit'>Phone No.</th>
                  <th className='border-2 text-center w-fit'>Designation</th>
                  <th className='border-2 text-center '>Gender</th>
                  <th className='border-2 text-center '>Education</th>
                  <th className='border-2 text-center '>Joined Date</th>
                  <th className='border-2 text-center '>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className='border-2 border-slate-400 text-center'>{data._id}</td>
                    <td className='border-2 border-slate-400 text-center'>
                      <img src={`./${data.imageFile}`} alt={`${data.name}`} className=' w-fit h-fit' /> {console.log(data.imageFile)}
                    </td>
                    <td className='border-2 border-slate-400 text-center'>{data.name}</td>
                    <td className='border-2 border-slate-400 text-center w-fit'>{data.email}</td>
                    <td className='border-2 border-slate-400 text-center w-fit'>{data.phonenumber}</td>
                    <td className='border-2 border-slate-400 text-center'>{data.designation}</td>
                    <td className='border-2 border-slate-400 text-center'>{data.gender}</td>
                    <td className='border-2 border-slate-400 text-center'>{data.courses.join(', ')}</td>
                    <td className='border-2 border-slate-400 text-center'>{new Date(data.joinedDate).toLocaleDateString()}</td>
                    <td className='border-2 border-slate-400 text-center'>
                      <div>
                        <button onClick={() => { editEmployeeFunc(data) }} className='border border-indigo1'>Edit</button>
                        <button onClick={() => { deleteEmployee(data._id) }} className='border border-indigo1'>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='w-full min-h-[71vh] flex justify-center items-center'>
              No Employee as of Now
              <Link to={"/empcreate"} className='m-1'>
                <button className='p-3 bg-indigo2'>Create New Employee</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;

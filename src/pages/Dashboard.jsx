import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div >
      <Navbar/>
        <div className='flex justify-center flex-col gap-8 text-2xl items-center border-2 border-indigo1 h-[90vh]'>
          Welcome to the Admin Dashboard Panel
          <div>
            Create a New Employee Profile {"->"}
            <Link className='bg-indigo2 p-2' to="/empcreate">Employee New Create</Link>
          </div>
          <div>
            List Employee Profiles {"->"}
            <Link className='bg-indigo2 p-2' to="/emplist">Employee List</Link>
          </div>
          
        </div>
    </div>
  )
}

export default Dashboard
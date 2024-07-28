import { useState } from 'react'
import { Link } from 'react-router-dom';
import Logout from './Logout';


function Navbar() {
    const [hamburger, setHamburger] = useState(false);



    return (
        <nav className=" bg-grey text-white h-14 pt-2">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex  flex-1 space-x-4">
                        <div>
                            <a href="/" className="flex items-center py-2 px-2 text-white hover:text-indigo2">
                                <span className="font-bold text-2xl ">EMS</span>
                            </a>
                        </div>
                        {/* Primary Navbar items */}
                        <div className="hidden  w-full md:flex justify-evenly space-x-1">
                            <Link to="/" className="py-3 px-3 hover:text-indigo2 active:text-grey active:bg-indigo1 rounded-t-md">Home</Link>
                            <Link to="/emplist" className="py-3 px-3 hover:text-indigo2  active:text-grey active:bg-indigo1 rounded-t-md">EmployeeList</Link>
                            <Logout />
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Logout />
                        <button onClick={() => setHamburger(!hamburger)} className="mobile-menu-button text-4xl">
                            {hamburger ? "✕" : "▤"}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`${hamburger ? 'absolute' : 'hidden'} md:hidden w-full bg-grey text-center mobileViewHam`}>
                <div className='flex flex-col'>
                    <Link to="/" className="py-3 px-3 hover:text-indigo2 active:text-grey active:bg-indigo1 rounded-t-md">Home</Link>
                    <Link to="/emplist" className="py-3 px-3 hover:text-indigo2  active:text-grey active:bg-indigo1 rounded-t-md">EmployeeList</Link>
                </div>
            </div>

        </nav>

    )
}


export default Navbar
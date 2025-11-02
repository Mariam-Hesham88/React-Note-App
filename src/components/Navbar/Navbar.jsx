import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
    // let [isLogin, setIsLogin] = useState(true);
    let { userLogin, setUserLogin } = useContext(UserContext);

    useEffect(() => { }, []);

    function logOut(){
        localStorage.removeItem('userToken');
        setUserLogin(null);
    }

    return <>
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
        </button>
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white block ps-2.5 mb-5 text-blue-700">NOTE APP</span>

                {userLogin ?
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <i className="fa-solid fa-house"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={logOut} to={'/login'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <i className="fa-solid fa-arrow-left"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">LogOut</span>
                            </NavLink>
                        </li>
                    </ul>
                    :
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink to={'/login'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">LogIn</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <i className="fa-regular fa-file"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Register</span>
                            </NavLink>
                        </li>
                    </ul>
                }
            </div>
        </aside>
    </>
}

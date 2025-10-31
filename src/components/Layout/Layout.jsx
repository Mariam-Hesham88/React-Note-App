import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    return <>
        <Navbar/>
        <div className="p-4 sm:ml-64">
            <Outlet></Outlet>
        </div>
    </>
}

import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import Note from './components/Note/Note';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {

  let router = createBrowserRouter([
    { path:'', element:<Layout/>, children:[
      {index:true, element:<Home/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'note', element:<Note/>},
      {path:'*', element:<NotFound/>},
    ] }
  ]);
  

  return <RouterProvider router={router}>

  </RouterProvider>
}

export default App

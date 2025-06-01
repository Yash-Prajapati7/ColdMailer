import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react'
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Contact from './Components/Contact.jsx'
import Privacy from './Components/Privacy.jsx'
import GetStarted from './Components/GetStarted.jsx';
import Login from './Components/Login.jsx';
import Troubles from './Components/Troubles.jsx';
import Index from './Components/Index.jsx';
import './index.css'
import Guide from './Components/Guide.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="signup" element={<GetStarted />} />
      <Route path="login" element={<Login />} />
      <Route path="troubles" element={<Troubles />} />
      <Route path="main" element={<Index />} />
      <Route path="guide" element={<Guide />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

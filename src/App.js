import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';


import AdminPage from './AdminPage';
import ButtomMenu from './Components/BottomMenu';
import HomePage from "./HomePage"

export default function App(props) {

  useEffect(() => {
    console.clear();
    console.log(import.meta.env);
    console.log(process.env);
  }, []);


  return (
    <>
      <div className='pb-3'>
        {/* <AdminPage /> */}
        <HomePage />
      </div>
      <ButtomMenu />
    </>
  )
}






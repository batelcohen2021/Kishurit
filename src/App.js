import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import ButtomMenu from './GlobalComponents/BottomMenu';
import HomePage from './HomeComponents/HomePage';
import AdminPage from './AdminComponents/AdminPage';

export default function App(props) {

  useEffect(() => {
    console.clear();
    // console.log(import.meta.env);
    // console.log(process.env);
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






import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AdminPage from "./AdminPage";
import HomePage from "./HomePage";
import BottomMenu from "./Components/BottomMenu";

export default function App(props) {
  useEffect(() => {
    console.clear();
  }, []);

  useEffect(() => {
    // console.log(process);
    console.log(import.meta.env);
  }, []);

  return (
    <>
      <div className="pb-3">
        {/* <AdminPage /> */}
        <HomePage />
      </div>
      <BottomMenu />
    </>
  );
}

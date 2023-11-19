import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AdminPage from "./AdminPage";
import BottomMenu from "./Components/BottomMenu";
import HomePage from "./HomePage";

export default function App(props) {
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

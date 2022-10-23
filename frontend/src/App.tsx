import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Catalogue from "./components/Catalogue/Catalog";
import CareMain from "./components/Care/Care";
import BillsMain from "./components/Bills/Bills";
import MessageMain from "./components/Message/Message";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/home" element={<div />} />
        <Route path="/care" element={<CareMain />} />
        <Route path="/orders" element={<BillsMain />} />
        <Route path="/message" element={<MessageMain />} />
      </Routes>
    </>
  );
}

export default App;

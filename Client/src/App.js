import React from "react";
import Navbar from "./UserUi/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brochure from "./UserUi/Pages/brochure/brochure";

import Login from "./UserUi/Pages/Login/Login";
import SignIn from "./UserUi/Pages/SignPage/SignIn";
import AddItems from "./UserUi/Pages/add items/AddItems";
import AddAdvertis from "./UserUi/Pages/advertisements/AddAdvertis";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Brochure />} />
          <Route path="/add" element={<AddItems />} />

          <Route path="/AddVer" element={<AddAdvertis />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

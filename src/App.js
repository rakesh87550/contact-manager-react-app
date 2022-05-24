import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

// import components
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import ViewContact from "./components/ViewContact";
import AddContact from "./components/AddContact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contact/list"} />} />
        <Route path="/contact/list" element={<ContactList />} exact></Route>
        <Route path="/contact/add" element={<AddContact />} exact></Route>
        <Route path="/contact/edit/:contactId" element={<EditContact />} exact></Route>
        <Route
          path="/contact/view/:contactId"
          element={<ViewContact />}
          exact
        ></Route>
      </Routes>
    </>
  );
}

export default App;

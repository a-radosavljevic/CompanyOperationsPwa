import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./pages/search";
import Preview from "./pages/preview";
import Layout from "./common/layout/Layout.component";
import "react-datepicker/dist/react-datepicker.css";
import Login from "./pages/login";
import PublicRoute from "./validation/publicRoute";
import ProtectedRoute from "./validation/protectedRoute";
import Upload from "./pages/upload";
import Workflow from "./pages/workflow";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login></Login></PublicRoute>}></Route>
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Search />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/upload" element={<Upload></Upload>}></Route>
        <Route path="/workflow" element={<Workflow></Workflow>}></Route>
      </Route>
    </Routes>
  );
};

export default App;

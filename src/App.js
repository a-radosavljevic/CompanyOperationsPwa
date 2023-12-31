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
import WorkflowTask from "./pages/workflow-task";
import AddDocumentsInWorkflow from './pages/add-documents-in-task'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Search />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/upload" element={<Upload></Upload>}></Route>
        <Route path="/workflow" element={<Workflow></Workflow>}></Route>
        <Route path="/workflow-task" element={<WorkflowTask></WorkflowTask>}></Route>
        <Route path="/add-documents-in-task" element={<AddDocumentsInWorkflow></AddDocumentsInWorkflow>}></Route>
      </Route>
    </Routes>
  );
};

export default App;

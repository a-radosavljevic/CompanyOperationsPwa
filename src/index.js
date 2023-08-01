import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { register } from "./service-worker-registration";

register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    < AuthProvider >
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />}></Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider >
);

import React from "react";
import "./Loader.style.js";
import { LoaderContainer } from "./Loader.style.js";

export default function LoadingSpinner() {
  return (
        <LoaderContainer>
            <div className="loading-spinner"></div>
        </LoaderContainer>
  );
}
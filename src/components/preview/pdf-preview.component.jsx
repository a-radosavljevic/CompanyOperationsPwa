import { PDFReader } from "react-read-pdf";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PaginatePDFButtons } from "./PDFPreview.style";

const PDFPreview = ({ documentUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [documentSize, setDocumentSize] = useState(1);

  function loadedFile(totalPage) {
    setDocumentSize(totalPage);
  }

  return (
    <>
      <div className="pdf-preview-holder">
        <PDFReader
          page={currentPage}
          url={documentUrl}
          onDocumentComplete={loadedFile}
        />{" "}
      </div>
      <PaginatePDFButtons>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={solid("chevron-left")} />
        </button>
        <span>
          {currentPage} / {documentSize}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === documentSize}
        >
          <FontAwesomeIcon icon={solid("chevron-right")} />
        </button>
      </PaginatePDFButtons>
    </>
  );
};

export default PDFPreview;

import { baseURL } from "../../api/http";
import PhotoPreview from "../../components/preview/PhotoPreview.component";
import PDFPreview from "../../components/preview/pdf-preview.component";
import { MainContainer } from "../layout/Layout.style";

const FileAccordion = ({ id, document }) => {
  return (
    <>
      <MainContainer>
        <div className="accordion" id={`file-accordion${id}`}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`file-heading${id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#file-collapse${id}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Prikaži sadržaj dokumenta
              </button>
            </h2>
            <div
              id={`file-collapse${id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`file-heading${id}`}
              data-bs-parent={`#file-accordion${id}`}
            >
              <div className="of-auto">
                {document.contentType === "application/pdf" ? (
                  <PDFPreview
                    documentUrl={
                      baseURL + `/Document/download?id=${document.id}`
                    }
                  />
                ) : (
                  <PhotoPreview
                    photoUrl={baseURL + `/Document/download?id=${document.id}`}
                  ></PhotoPreview>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default FileAccordion;

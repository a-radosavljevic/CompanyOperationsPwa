import PhotoPreview from "../../components/preview/PhotoPreview.component";
import PDFPreview from "../../components/preview/pdf-preview.component";

const FileAccordion = ({ document }) => {
    const baseApiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
    return (
        <>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Prikaži sadržaj dokumenta
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div>
                            {
                                document.contentType === 'application/pdf'
                                    ?
                                    <PDFPreview documentUrl={baseApiUrl + `/Document/download?id=${document.id}`} />
                                    :
                                    <PhotoPreview photoUrl={baseApiUrl + `/Document/download?id=${document.id}`}></PhotoPreview>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileAccordion;
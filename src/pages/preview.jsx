import { useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { ErrorMessage, SuccessMessage } from "../utils/messager";
import axios from "axios";
import LoadingSpinner from "../common/loader/Loader.component";
import FileAccordion from "../common/file-accordion/FileAccordion.component";
import { isPreviewSupported } from "../utils/helper-methods";
import DocumentInfo from "../components/preview/DocumentInfo.component";

const Preview = () => {
  const baseApiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
  const [searchParams] = useSearchParams();
  const [documentId, setDocumentId] = useState();
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const documentIdParam = searchParams.get('id')
    if (documentIdParam) {
      setDocumentId(documentIdParam)
    }
    else {
      ErrorMessage("Dokument ne može biti pronađen", '', () => {
        window.location.href = `/`
      })
    }
  }, [])

  useEffect(() => {
    documentId && fetchDocumentData();
  }, [documentId])

  const fetchDocumentData = async () => {
    const response = await axios.get(baseApiUrl + `/Document/get?id=${documentId}`);
    if (response.status === 200) {
      setDocument(response.data);
      setLoading(false);
    }
    else {
      ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
    }
  }

  const handleDelete = async (id) => {
    const response = await axios.get(baseApiUrl + `/Document/remove?id=${id}`)
    if (response.status === 200) {
      SuccessMessage('Dokument je uspešno obrisan', '', () => window.location.href = "/");
    }
    else {
      ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
    }
  }
  const handleStartWorkTask = () => alert("Funkcionalnost nije implementirana")

  return (
    <>
      {
        loading ?
          (
            <LoadingSpinner></LoadingSpinner>
          )
          : (
            <>
              <DocumentInfo document={document} handleDelete={handleDelete} handleStartWorkTask={handleStartWorkTask}></DocumentInfo>
              {isPreviewSupported(document.contentType) && <FileAccordion document={document}></FileAccordion>}
            </>
          )
      }
    </>
  );
};

export default Preview;

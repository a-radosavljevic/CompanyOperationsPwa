import { useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { ErrorMessage, SuccessMessage } from "../utils/messager";
import LoadingSpinner from "../common/loader/Loader.component";
import FileAccordion from "../common/file-accordion/FileAccordion.component";
import { isPreviewSupported } from "../utils/helper-methods";
import DocumentInfo from "../components/preview/DocumentInfo.component";
import Modal from "../common/modal/Modal.component";
import StartWorklow from "../components/workflow/StartWorkflow.component";
import http from "../api/http";

const Preview = () => {
  const [searchParams] = useSearchParams();
  const [documentId, setDocumentId] = useState();
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(true);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

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
    const response = await http.get(`/Document/get?id=${documentId}`);
    if (response.status === 200) {
      setDocument(response.data);
      setLoading(false);
    }
    else {
      ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
    }
  }

  const handleDelete = async (id) => {
    const response = await http.get(`/Document/remove?id=${id}`)
    if (response.status === 200) {
      SuccessMessage('Dokument je uspešno obrisan', '', () => window.location.href = "/");
    }
    else {
      ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
    }
  }

  return (
    <>
      {
        loading ?
          (
            <LoadingSpinner></LoadingSpinner>
          )
          : (
            <>
              <DocumentInfo document={document} handleDelete={handleDelete} handleStartWorkTask={() => setShowWorkflowModal(true)}></DocumentInfo>
              {isPreviewSupported(document.contentType) && <FileAccordion id={document.id} document={document}></FileAccordion>}
              <Modal show={showWorkflowModal} title={"Novi radni zadatak"} handleClose={() => setShowWorkflowModal((false))}>
                <StartWorklow documentId={documentId}></StartWorklow>
              </Modal>
            </>
          )
      }
    </>
  );
};

export default Preview;

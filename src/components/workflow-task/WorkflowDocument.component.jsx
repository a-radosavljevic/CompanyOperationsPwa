import { useEffect, useState } from "react";
import LoadingSpinner from "../../common/loader/Loader.component";
import FileAccordion from "../../common/file-accordion/FileAccordion.component";
import { isPreviewSupported } from "../../utils/helper-methods";
import DocumentInfo from "../preview/DocumentInfo.component";

const WorkflowDocument = ({ documentProp }) => {
    const [document, setDocument] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        documentProp && setDocument(documentProp);
    }, [documentProp])

    useEffect(() => {
        document && setLoading(false);
    }, [document])

    return (
        <>
            {
                loading ?
                    (
                        <LoadingSpinner></LoadingSpinner>
                    )
                    : (
                        <>
                            <DocumentInfo editing={false} document={document}></DocumentInfo>
                            {isPreviewSupported(document.contentType) && <FileAccordion id={document.id} document={document}></FileAccordion>}
                        </>
                    )
            }
        </>
    );
};

export default WorkflowDocument;

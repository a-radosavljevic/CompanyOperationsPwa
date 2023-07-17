import { useEffect, useState } from "react";
import { MainContainer } from "../layout/Layout.style";
import { FileSubmitContainer, FileSubmitLabel } from "./fileSubmit.style";
import { getFileExtension } from "../../utils/helper-methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { byteArrayToDataURL, getContentTypeFromExtension } from '../../utils/helper-methods'

const FileSubmit = ({ handleUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileExtension, setSelectedFileExtension] = useState('');
    const [fileData, setFileData] = useState('');
    const [previewFile, setPreviewFile] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result;
            setFileData(data);
        };
        const fileExtension = getFileExtension(file.name);
        setSelectedFileExtension(fileExtension);

        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        if (fileData) {
            handleUpload(fileData, selectedFileExtension);
            setPreviewFile(byteArrayToDataURL(fileData, getContentTypeFromExtension(selectedFileExtension)))
        }
    }, [fileData])

    return (
        <MainContainer>
            <FileSubmitContainer>
                <FileSubmitLabel>
                    {previewFile ? (
                        <>
                            <p>Učitani fajl: {selectedFile.name}</p>
                            <iframe title={selectedFile.name} src={previewFile} alt="File Preview" />
                        </>
                    )
                        :
                        (
                            <>
                                <input type="file" onChange={handleFileChange} hidden />
                                <FontAwesomeIcon icon={solid("upload")} />
                            </>
                        )}
                </FileSubmitLabel>
            </FileSubmitContainer>
        </MainContainer>
    );
}

export default FileSubmit;
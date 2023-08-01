import { useState } from "react";
import Camera from "../common/camera/camera.component"
import FileSubmit from "../common/file-submit/fileSubmit.component";
import UploadContainer from "../components/upload/upload.component";
import { UploadDiv, UploadRow } from "../components/upload/upload.style";
import DocumentData from "../components/upload/documentData.component";
import { ErrorMessage, SuccessMessage } from "../utils/messager";
import { DocumentDTO } from "../api/models.ts";
import { getContentTypeFromExtension } from '../utils/helper-methods'
import http from "../api/http";
import Joi from 'joi-browser'
import { validateModel } from "../validation/input-validations";
import { useRef } from "react";

const Upload = () => {
    const [takePhotoVisible, setTakingPhotoVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [errors, setErrors] = useState();

    let documentObj = useRef(new DocumentDTO());

    const validationSchema = {
        content: Joi.required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.required()
    }

    const cancelAdding = () => {
        setTakingPhotoVisible(false);
        setUploadVisible(false);
    }

    const handleDataChange = e => documentObj.current[e.target.name] = e.target.value;

    const handleUpload = (value, extension) => {
        let contentType = getContentTypeFromExtension(extension);
        documentObj.current.content = value;
        documentObj.current.contentType = contentType;
        documentObj.current.extension = extension;
    }

    const submitDocument = async () => {
        const validations = validateModel(documentObj.current, validationSchema);
        if (validations) {
            setErrors(validations);
            return;
        }

        const formData = new FormData();
        formData.append('content', new Blob([documentObj.current.content]), 'filename.bin');
        formData.append('contentType', documentObj.current.contentType);
        formData.append('extension', documentObj.current.extension);
        formData.append('name', documentObj.current.name);
        formData.append('description', documentObj.current.description);
        formData.append('type', documentObj.current.type);

        let response = await http.post("/Document/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if (response.status === 200) {
            SuccessMessage("Dokument je unet u sistem", '', () => {
                window.location.href = `/preview?id=${response.data.id}`
            });
        }
        else {
            ErrorMessage("Greška prilikom unosa dokumenta u sistem")
        }
    }

    return (
        <>
            <h2>Unos dokumenta</h2>
            {(takePhotoVisible || uploadVisible) &&
                <>
                    <button className="btn btn-light" onClick={cancelAdding}>Otkaži dodavanje dokumenta</button>
                    <UploadRow>
                        <UploadDiv>
                            {takePhotoVisible && <Camera handleTakingPhoto={handleUpload} errors={errors} />}
                            {uploadVisible && <FileSubmit handleUpload={handleUpload} errors={errors} />}
                        </UploadDiv>
                        <UploadDiv>
                            <DocumentData handleDataChange={handleDataChange} errors={errors}></DocumentData>
                        </UploadDiv>
                    </UploadRow>
                    <div className="text-right">
                        <button onClick={submitDocument} className="btn btn-primary">Sačuvaj</button>
                    </div>
                </>
            }
            {!takePhotoVisible && !uploadVisible && <UploadContainer chooseTakePhoto={() => setTakingPhotoVisible(true)} chooseUpload={() => setUploadVisible(true)}></UploadContainer>}
        </>
    )
}

export default Upload;
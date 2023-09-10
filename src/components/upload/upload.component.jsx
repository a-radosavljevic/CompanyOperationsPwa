import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { MainContainer } from "../../common/layout/Layout.style";
import { UploadDiv, UploadRow, UploadText } from "./upload.style";

const UploadContainer = ({ chooseTakePhoto, chooseUpload }) => (
        <UploadRow className="slide-up-anim">
            <UploadDiv className="btn btn-primary" onClick={chooseTakePhoto}>
                <FontAwesomeIcon icon={solid("camera")}></FontAwesomeIcon>
                <UploadText>Fotografiši dokument</UploadText>
            </UploadDiv>
            <UploadDiv className="btn btn-primary" onClick={chooseUpload}>
                <FontAwesomeIcon icon={solid("upload")}></FontAwesomeIcon>
                <UploadText>Učitaj dokument</UploadText>
            </UploadDiv>
        </UploadRow>
)

export default UploadContainer;
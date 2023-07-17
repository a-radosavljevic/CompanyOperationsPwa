import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { MainContainer } from "../../common/layout/Layout.style";
import { UploadDiv, UploadRow, UploadText } from "./upload.style";

const UploadContainer = ({ chooseTakePhoto, chooseUpload }) => (
    <MainContainer>
        <UploadRow>
            <UploadDiv className="btn btn-secondary" onClick={chooseTakePhoto}>
                <FontAwesomeIcon icon={solid("camera")}></FontAwesomeIcon>
                <UploadText>Fotografiši dokument</UploadText>
            </UploadDiv>
            <UploadDiv className="btn btn-secondary" onClick={chooseUpload}>
                <FontAwesomeIcon icon={solid("upload")}></FontAwesomeIcon>
                <UploadText>Učitaj dokument</UploadText>
            </UploadDiv>
        </UploadRow>
    </MainContainer>
)

export default UploadContainer;
import { baseURL } from "../../api/http";
import ButtonWithPIN from "../../common/button-with-pin/ButtonWithPIN.component";
import { MainContainer } from "../../common/layout/Layout.style";
import { documentTypesList } from "../../utils/document.data";
import { convertLocalToUTCDate } from '../../utils/helper-methods';

const DocumentInfo = ({ editing, document, handleDelete, handleStartWorkTask }) => {
    return (
        <MainContainer>
            {editing && <h2>Pregled dokumenta: {document.title}</h2>}
            <div className="form-group">
                <label>Opis: <strong>{document.description}</strong></label>
            </div>
            <div className="form-group">
                <label>Tip: <strong>{documentTypesList.find(x => x.value === document.type).label}</strong></label>
            </div>
            <div className="form-group">
                <label>Datum kreiranja: <strong>{convertLocalToUTCDate(document.creationDate)}</strong></label>
            </div>
            <div className="text-right">
                {editing && <ButtonWithPIN className="btn btn-outline-danger" onClick={() => handleDelete(document.id)}>Obriši</ButtonWithPIN>}
                <a href={baseURL + `/Document/download?id=${document.id}`} className="btn btn-outline-primary">Preuzmi</a>
                {editing && <button className="btn btn-primary" onClick={handleStartWorkTask}>Započni radni zadatak</button>}
            </div>
        </MainContainer>
    )
}

DocumentInfo.defaultProps = {
    editing: true
}

export default DocumentInfo;
import { baseURL } from "../../api/http";
import { MainContainer } from "../../common/layout/Layout.style";
import { convertLocalToUTCDate } from '../../utils/helper-methods';

const DocumentInfo = ({ document, handleDelete, handleStartWorkTask }) => {
    return (
        <MainContainer>
            <h2>Pregled dokumenta: {document.title}</h2>
            <div className="form-group">
                <label>Opis: <strong>{document.description}</strong></label>
            </div>
            <div className="form-group">
                <label>Tip: <strong>{document.type}</strong></label>
            </div>
            <div className="form-group">
                <label>Datum kreiranja: <strong>{convertLocalToUTCDate(document.creationDate)}</strong></label>
            </div>
            <div className="text-right">
                <button className="btn btn-outline-danger" onClick={() => handleDelete(document.id)}>Obriši</button>
                <a href={baseURL + `/Document/download?id=${document.id}`} className="btn btn-outline-primary">Preuzmi</a>
                <button className="btn btn-primary" onClick={handleStartWorkTask}>Započni radni zadatak</button>
            </div>
        </MainContainer>
    )
}

export default DocumentInfo;
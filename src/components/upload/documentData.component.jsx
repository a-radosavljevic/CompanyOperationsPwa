import { MainContainer } from "../../common/layout/Layout.style";
import { Select, MenuItem } from "@mui/material";
import { documentTypesList } from "../../utils/document.data";

const DocumentData = ({ handleDataChange }) => {
    return (
        <MainContainer>
            <div className="form-group">
                <label>Naziv</label>
                <input name="name" onChange={handleDataChange} className="form-control" />
            </div>
            <div className="form-group">
                <label>Opis</label>
                <input name="description" onChange={handleDataChange} className="form-control" />
            </div>
            <div className="form-group">
                <label>Tip</label>
                <Select
                    name="type"
                    className="form-control"
                    placeholder="Valuta"
                    defaultValue={''}
                    onChange={handleDataChange}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                >
                    {documentTypesList.map((item) => (
                        <MenuItem key={item.label} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </MainContainer>
    )
}

export default DocumentData;
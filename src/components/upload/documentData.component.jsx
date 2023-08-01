import { MainContainer } from "../../common/layout/Layout.style";
import { Select, MenuItem } from "@mui/material";
import { documentTypesList } from "../../utils/document.data";
import TextDanger from "../../common/text-danger/TextDanger.component";

const DocumentData = ({ handleDataChange, errors }) => {
    return (
        <MainContainer>
            <div className="form-group">
                <label>Naziv</label>
                <input name="name" onChange={handleDataChange} className="form-control" />
                <TextDanger message={errors?.name}></TextDanger>
            </div>
            <div className="form-group">
                <label>Opis</label>
                <input name="description" onChange={handleDataChange} className="form-control" />
                <TextDanger message={errors?.description}></TextDanger>
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
                <TextDanger message={errors?.type}></TextDanger>
            </div>
        </MainContainer>
    )
}

export default DocumentData;
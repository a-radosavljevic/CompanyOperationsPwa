import { MainContainer } from "../../common/layout/Layout.style";
import Table from "../../common/table/Table.component";
import { Select, MenuItem } from "@mui/material";
import CustomDatePicker from "../../common/custom-date-picker/CustomDatePicker.component";
import { documentTypesList } from '../../utils/document.data'
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const SearchContainer = ({ data, columns, handleChange, searchDocuments, handleReset }) => {
  const formRef = useRef(null)
  const [selectedDateFrom, setSelectedDateFrom] = useState();
  const [selectedDateTo, setSelectedDateTo] = useState();

  const handleInputChange = e => handleChange(e.target.name, e.target.value)

  useEffect(() => {
    handleChange('dateFrom', selectedDateFrom ? selectedDateFrom : null);
  }, [selectedDateFrom])

  useEffect(() => {
    handleChange('dateTo', selectedDateTo ? selectedDateTo : null);
  }, [selectedDateTo])

  const resetFilters = () => {
    formRef.current && formRef.current.reset();
    handleReset();
  }

  return (
    <>
      <MainContainer>
        <form ref={formRef}>
          <div className="form-group">
            <label>Naziv</label>
            <input name="name" className="form-control" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Opis</label>
            <input name="description" className="form-control" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Tip</label>
            <Select
              className="form-control"
              placeholder="Tip"
              name="type"
              defaultValue={''}
              onChange={handleInputChange}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            >
              {documentTypesList.map((item) => (
                <MenuItem key={item.label} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <label>Datum kreiranja od</label>
            <CustomDatePicker
              className="form-control"
              selected={selectedDateFrom}
              onChange={setSelectedDateFrom}
            />
          </div>
          <div className="form-group">
            <label>Datum kreiranja do</label>
            <CustomDatePicker
              className="form-control"
              selected={selectedDateTo}
              onChange={setSelectedDateTo}
            />
          </div>
        </form>
        <div className="text-right">
          <button className="btn btn-outline-primary" onClick={resetFilters}>Poništi pretragu</button>
          <button className="btn btn-primary" onClick={searchDocuments}>Pretraga</button>
        </div>
      </MainContainer>
      <hr />
      <MainContainer>
        <Table columns={columns} data={data} />
      </MainContainer>
    </>
  );
};

export default SearchContainer;

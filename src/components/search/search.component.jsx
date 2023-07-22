import { MainContainer } from "../../common/layout/Layout.style";
import Table from "../../common/table/Table.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Select, MenuItem } from "@mui/material";
import CustomDatePicker from "../../common/custom-date-picker/CustomDatePicker.component";
import { Link } from "react-router-dom";
import { documentTypesList } from '../../utils/document.data'
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { baseURL } from "../../api/http";

const SearchContainer = ({ data, handleChange, searchDocuments, handleReset }) => {
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

  const columns = [
    {
      Header: "Naziv",
      accessor: "title",
    },
    {
      accessor: "delete",
      className: "two-buttons-column",
      Cell: ({ row }) => {
        return (
          <>
            <Link className="btn btn-primary table-btn m-r-5" to={`/Preview?id=${row.original.id}`}>
              <FontAwesomeIcon icon={solid("search")} />
            </Link >
            <a href={baseURL + `/Document/download?id=${row.original.id}`} className="btn btn-primary table-btn" type="button">
              <FontAwesomeIcon icon={solid("download")} />
            </a>
          </>
        );
      },
    },
  ];
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

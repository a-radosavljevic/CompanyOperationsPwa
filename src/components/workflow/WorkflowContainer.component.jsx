import { MainContainer } from '../../common/layout/Layout.style'
import { MenuItem, Select } from "@mui/material";
import CustomDatePicker from "../../common/custom-date-picker/CustomDatePicker.component";
import Table from "../../common/table/Table.component";
import { useRef, useState } from "react";
import { workflowStatusList } from "../../utils/workflow.data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../common/modal/Modal.component';
import StartWorklow from './StartWorkflow.component';
import { SuccessMessage, ErrorMessage } from '../../utils/messager';
import http from '../../api/http';

const WorkflowContainer = ({ data, handleChange, searchMyWorkflows, handleReset }) => {
    const formRef = useRef(null);
    const [selectedDateFrom, setSelectedDateFrom] = useState();
    const [selectedDateTo, setSelectedDateTo] = useState();
    const [showStartWorkflow, setShowStartWorkflow] = useState(false)

    useEffect(() => {
        handleChange('dateFrom', selectedDateFrom ? selectedDateFrom : null);
    }, [selectedDateFrom])

    useEffect(() => {
        handleChange('dateTo', selectedDateTo ? selectedDateTo : null);
    }, [selectedDateTo])

    const handleInputChange = e => handleChange(e.target.name, e.target.value);

    const resetFilters = () => {
        formRef.current && formRef.current.reset();
        handleReset();
    }

    const handleCreatedNewWorkflow = () => {
        searchMyWorkflows();
        setShowStartWorkflow(false);
    }

    const rejectWorkflow = async id => {
        let respoonse = await http.get(`/Workflow/reject?id=${id}`)
        if (respoonse.status === 200) {
            SuccessMessage('Radni zadatak je odbijen', '', searchMyWorkflows);
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const columns = [
        {
            Header: "Naziv",
            accessor: "name"
        },
        {
            accessor: "status",
            Cell: ({ row }) => {
                return workflowStatusList.find(x => x.value === row.original.status).label
            }
        },
        {
            accessor: "buttons",
            className: "two-buttons-column",
            Cell: ({ row }) => {
                return (
                    <>
                        <Link className="btn btn-primary table-btn m-r-5" to={`/WorkflowTask?id=${row.original.id}`}>
                            <FontAwesomeIcon icon={solid("check")} />
                        </Link>
                        <a onClick={() => rejectWorkflow(row.original.id)} className="btn btn-primary table-btn" type="button">
                            <FontAwesomeIcon icon={solid(("xmark"))} style={{ color: "#ff0000", }} />
                        </a>
                    </>
                )
            }
        }
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
                        <label>Identifikator</label>
                        <input name="identification" className="form-control" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <Select
                            className="form-control"
                            placeholder="Status"
                            name="status"
                            defaultValue={''}
                            onChange={handleInputChange}
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        >
                            {workflowStatusList.map((item) => (
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
                    <button className="btn btn-primary" onClick={searchMyWorkflows}>Pretraga</button>
                </div>
            </MainContainer>
            <hr />
            <MainContainer>
                <Table columns={columns} data={data} />
            </MainContainer>
            <MainContainer>
                <div className="text-right">
                    <button className="btn btn-primary" onClick={() => setShowStartWorkflow(true)}>Kreiraj novi zadatak</button>
                </div>
            </MainContainer>
            <Modal show={showStartWorkflow} title={"Novi radni zadatak"} handleClose={() => setShowStartWorkflow(false)}>
                <StartWorklow handleCreated={handleCreatedNewWorkflow}></StartWorklow>
            </Modal>
        </>
    )
}

export default WorkflowContainer;
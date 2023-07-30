import { useEffect, useLayoutEffect } from "react";
import { MainContainer } from "../../common/layout/Layout.style";
import { useState } from "react";
import { ErrorMessage, SuccessMessage } from "../../utils/messager";
import { useRef } from "react";
import { WorkflowDTO } from "../../api/models.ts";
import { Select, MenuItem } from "@mui/material";
import http from "../../api/http";
import ButtonWithPIN from '../../common/button-with-pin/ButtonWithPIN.component'

const StartWorklow = ({ documentId }) => {
    const [users, setUsers] = useState([]);
    const workflowObj = useRef(new WorkflowDTO())

    useEffect(() => {
        if (documentId) {
            workflowObj.current.documentIds = [documentId]
        }
        ;
    }, [documentId])
    const handleInputChange = e => workflowObj.current[e.target.name] = e.target.value;

    const startWorkflow = async () => {
        let response = await http.post(`/workflow/create`, workflowObj.current, {
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        })
        if (response.status === 200) {
            SuccessMessage("Novi radni zadatak je uspešno pokrenut", "", () => window.location.href = `/workflow-task?id=${response.data.id}`);
        } else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    };

    const fetchUsers = async () => {
        let result = await http.get(`/User/get-all`);
        if (result.status === 200) {
            setUsers(result.data)
        } else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    useLayoutEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>
            <MainContainer>
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
                    <label>Dodeljeni radnik</label>
                    {users.length && <Select
                        className="form-control"
                        placeholder="Radnik"
                        name="assignedUserId"
                        defaultValue={''}
                        onChange={handleInputChange}
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    >
                        {users.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.firstName} {item.lastName}
                            </MenuItem>
                        ))}
                    </Select>}
                </div>
            </MainContainer>
            <MainContainer>
                <div className="text-right">
                    <ButtonWithPIN className="btn btn-primary" onClick={startWorkflow}>Kreiraj zadatak</ButtonWithPIN>
                </div>
            </MainContainer>
        </>
    )
}

export default StartWorklow;
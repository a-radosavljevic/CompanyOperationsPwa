import { useState, useEffect, useRef } from "react";
import SearchContainer from "../components/search/search.component";
import { AddWorkflowDocumentsDTO, SearchDocumentDTO } from "../api/models.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useSearchParams } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "../utils/messager";
import http from "../api/http";
import { useLayoutEffect } from "react";

const AddDocumentsInWorkflow = () => {
    const [searchParams] = useSearchParams();
    const [taskId, setTaskId] = useState();
    const [documentIds, setDocumentIds] = useState([]);
    const searchObject = useRef(new SearchDocumentDTO());
    const submitObject = useRef(new AddWorkflowDocumentsDTO());
    const [documents, setDocuments] = useState([]);

    useLayoutEffect(() => {
        const taskIdParam = searchParams.get('id')
        if (taskIdParam) {
            setTaskId(taskIdParam)
        }
        else {
            ErrorMessage("Raddni zadatak ne može biti pronađen", '', () => {
                window.location.href = `/`
            })
        }
    }, [])

    useEffect(() => {
        searchDocuments();
    }, [])

    useEffect(() => {
        taskId && fetchTaskDocuments();
    }, [taskId])

    const handleChange = (name, value) => searchObject.current[name] = value;

    const searchDocuments = async () => {
        let response = await http.post('/Document/search', searchObject.current, {
            headers: {
                'Content-Type': 'application/json-patch+json',
            }
        })
        if (response.status === 200) {
            setDocuments(response.data);
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const fetchTaskDocuments = async () => {
        let response = await http.get(`workflow/get-documents?workflowId=${taskId}`)
        if (response.status === 200 || response.status === 204) {
            if (response.data)
                setDocumentIds(response.data);
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const finishAdding = async () => {
        submitObject.current.workflowId = taskId
        submitObject.current.documentIds = documentIds;

        let response = await http.post('workflow/add-documents', submitObject.current);
        if (response.status === 200) {
            SuccessMessage('Dokumenti su uspešno dodati u radni zadatak', '', () => window.location.href = `/workflow-task?id=${taskId}`)
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const handleReset = () => {
        searchObject.current = new SearchDocumentDTO();
        searchDocuments();
    }

    const add = id => {
        let idsArray = [...documentIds];
        if (idsArray.length > 0) {
            idsArray.push(id);
        }
        else idsArray = [id];
        setDocumentIds(idsArray);
    }
    const remove = id => {
        let idsArray = documentIds;
        setDocumentIds(idsArray.filter(x => x !== id));
    }

    let columns = [
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
                        {
                            documentIds?.includes(row.original.id)
                                ?
                                <button onClick={() => remove(row.original.id)} className="btn btn-primary table-btn" type="button">
                                    <FontAwesomeIcon icon={solid("minus")} style={{ color: "#ff0000", }} />
                                </button>
                                :
                                <button onClick={() => add(row.original.id)} className="btn btn-primary table-btn" type="button">
                                    <FontAwesomeIcon icon={solid("plus")} />
                                </button>
                        }
                        <Link className="btn btn-primary table-btn m-r-5" to={`/Preview?id=${row.original.id}`}>
                            <FontAwesomeIcon icon={solid("search")} />
                        </Link >
                    </>
                );
            },
        },
    ];
    return <>
        <h2>Dodaj dokumente u radni zadatak</h2>
        <SearchContainer data={documents} columns={columns} handleChange={handleChange} searchDocuments={searchDocuments} handleReset={handleReset}></SearchContainer>
        <div className="text-right">
            <button className="btn btn-primary" onClick={finishAdding}>Završi dodavanje</button>
        </div>
    </>
}

export default AddDocumentsInWorkflow;
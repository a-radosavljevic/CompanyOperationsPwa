import { useState } from "react";
import WorkflowContainer from "../components/workflow/WorkflowContainer.component";
import { useRef } from "react";
import { SearchWorkflowsDTO } from "../api/models.ts";
import { useEffect } from "react";
import axios from "axios";
import { ErrorMessage } from "../utils/messager";
import useAuth from "../hooks/useAuth";

const Workflow = () => {
    const baseApiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
    const [data, setData] = useState([]);
    const { user } = useAuth();
    const searchObject = useRef(new SearchWorkflowsDTO());

    useEffect(() => {
        searchMyWorkflows();
    }, [])

    const handleChange = (name, value) => searchObject.current[name] = value;

    const searchMyWorkflows = async () => {
        searchObject.current.userId = user.nameid;
        let result = await axios.post(baseApiUrl + '/Workflow/search', searchObject.current, {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        });

        if (result.status === 200) {
            setData(result.data);
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const handleReset = () => {
        searchObject.current = new SearchWorkflowsDTO();
        searchMyWorkflows();
    }

    return (
        <>
            <h2>Moji radni zadaci</h2>
            <WorkflowContainer data={data} handleChange={handleChange} searchMyWorkflows={searchMyWorkflows} handleReset={handleReset}></WorkflowContainer>
        </>
    )
}

export default Workflow;
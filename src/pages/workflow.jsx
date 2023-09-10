import { useState } from "react";
import WorkflowContainer from "../components/workflow/WorkflowContainer.component";
import { useRef } from "react";
import { SearchWorkflowsDTO } from "../api/models.ts";
import { useEffect } from "react";
import { ErrorMessage } from "../utils/messager";
import useAuth from "../hooks/useAuth";
import http from "../api/http";
import { MainContainer } from "../common/layout/Layout.style";

const Workflow = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const searchObject = useRef(new SearchWorkflowsDTO());

  useEffect(() => {
    searchMyWorkflows();
  }, []);

  const handleChange = (name, value) => (searchObject.current[name] = value);

  const searchMyWorkflows = async () => {
    searchObject.current.userId = user;
    let result = await http.post("/Workflow/search", searchObject.current, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });

    if (result.status === 200) {
      setData(result.data);
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };

  const handleReset = () => {
    searchObject.current = new SearchWorkflowsDTO();
    searchMyWorkflows();
  };

  return (
    <>
      <MainContainer className="slide-up-anim">
        <h2>Moji radni zadaci</h2>
      </MainContainer>
      <WorkflowContainer
        className="slide-up-anim"
        data={data}
        handleChange={handleChange}
        searchMyWorkflows={searchMyWorkflows}
        handleReset={handleReset}
      ></WorkflowContainer>
    </>
  );
};

export default Workflow;

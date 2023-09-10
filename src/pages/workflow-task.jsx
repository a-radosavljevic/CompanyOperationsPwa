import { useLayoutEffect } from "react";
import WorkflowTaskContainter from "../components/workflow-task/WorkflowTask.component";
import { useSearchParams } from "react-router-dom";
import { SuccessMessage, ErrorMessage } from "../utils/messager";
import { useEffect } from "react";
import { useState } from "react";
import http from "../api/http";
import LoadingSpinner from "../common/loader/Loader.component";
import Modal from "../common/modal/Modal.component";
import { MainContainer } from "../common/layout/Layout.style";
import { useRef } from "react";
import ButtonWithPIN from "../common/button-with-pin/ButtonWithPIN.component";
import { validateModel } from "../validation/input-validations";
import Joi from "joi-browser";
import TextDanger from "../common/text-danger/TextDanger.component";

const WorkflowTask = () => {
  const [searchParams] = useSearchParams();
  const [taskId, setTaskId] = useState();
  const [task, setTask] = useState();
  const [documents, setDocuments] = useState();
  const [loading, setLoadinig] = useState(true);
  const [showFinishTaskModal, setShowFinishTaskModal] = useState(false);
  const [errors, setErrors] = useState();

  const commentRef = useRef(null);

  useLayoutEffect(() => {
    const taskIdParam = searchParams.get("id");
    if (taskIdParam) {
      setTaskId(taskIdParam);
    } else {
      ErrorMessage(
        "Radni zadatak ne može biti pronađen",
        "",
        () => (window.location.href = "/")
      );
    }
  }, []);

  useEffect(() => {
    taskId && fetchTask();
  }, [taskId]);

  useEffect(() => {
    if (task) {
      if (task.documentIds) {
        fetchTaskDocuments(task.documentIds);
      } else setLoadinig(false);
    }
  }, [task]);

  const fetchTask = async () => {
    let response = await http.get(`/workflow/get?id=${taskId}`);

    if (response.status === 200) {
      setTask(response.data);
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };

  const fetchTaskDocuments = async (ids) => {
    let response = await http.post("document/get-many", ids);
    if (response.status === 200) {
      setDocuments(response.data);
      setLoadinig(false);
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };

  const rejectWorkflow = async () => {
    let response = await http.get(`/Workflow/reject?id=${taskId}`);
    if (response.status === 200) {
      SuccessMessage(
        "Radni zadatak je odbijen",
        "",
        (window.location.href = "/workflow")
      );
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };

  const updateStatus = async (status) => {
    let taskObj = task;
    taskObj.status = status;
    let response = await http.post(`/Workflow/update`, taskObj);
    if (response.status === 200) {
      SuccessMessage("Radni zadatak ažuriran", "", () =>
        setTask(response.data)
      );
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };

  const finishWorkflow = async (e) => {
    const validation = validateModel(
      { comment: commentRef.current.value },
      { comment: Joi.string().required() }
    );
    if (validation) {
      setErrors(validation);
      return;
    }

    let taskObj = task;
    taskObj.comment = commentRef.current.value;
    taskObj.status = 3;
    let response = await http.post(`/Workflow/update`, taskObj);
    if (response.status === 200) {
      SuccessMessage(
        "Radni zadatak ažuriran",
        "",
        () => (window.location.href = "/workflow")
      );
    } else {
      ErrorMessage("Došlo je do neočekivane greške", "", () =>
        window.location.reload()
      );
    }
  };
  return (
    <>
      <MainContainer className="slide-up-anim">
        <h2>Radni zadatak</h2>
      </MainContainer>
      {loading && <LoadingSpinner></LoadingSpinner>}
      {!loading && (
        <WorkflowTaskContainter
          className="slide-up-anim"
          task={task}
          documents={documents}
          updateStatus={updateStatus}
          handleReject={rejectWorkflow}
          showFinishTaskModal={() => setShowFinishTaskModal(true)}
        ></WorkflowTaskContainter>
      )}
      <Modal
        show={showFinishTaskModal}
        title={"Završavanje radnog zadatka"}
        handleClose={() => setShowFinishTaskModal(false)}
      >
        <MainContainer className="slide-up-anim">
          <div className="form-group">
            <label>Zaključak rada na zadatku</label>
            <textarea
              className="form-control"
              ref={commentRef}
              rows="20"
              style={{ height: "300px" }}
            ></textarea>
            <TextDanger message={errors?.comment}></TextDanger>
          </div>
        </MainContainer>
        <MainContainer className="slide-up-anim">
          <div className="text-right">
            <ButtonWithPIN className="btn btn-primary" onClick={finishWorkflow}>
              Završi zadatak
            </ButtonWithPIN>
          </div>
        </MainContainer>
      </Modal>
    </>
  );
};

export default WorkflowTask;

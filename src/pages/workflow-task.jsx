import { useLayoutEffect } from 'react';
import WorkflowTaskContainter from '../components/workflow-task/WorkflowTask.component'
import { useSearchParams } from 'react-router-dom';
import { SuccessMessage, ErrorMessage } from '../utils/messager';
import { useEffect } from 'react';
import { useState } from 'react';
import http from '../api/http';
import LoadingSpinner from '../common/loader/Loader.component';
import Modal from '../common/modal/Modal.component'
import { MainContainer } from '../common/layout/Layout.style';
import { useRef } from 'react';

const WorkflowTask = () => {
    const [searchParams] = useSearchParams();
    const [taskId, setTaskId] = useState();
    const [task, setTask] = useState();
    const [loading, setLoadinig] = useState(true);
    const [showFinishTaskModal, setShowFinishTaskModal] = useState(false);

    const commentRef = useRef(null)

    useLayoutEffect(() => {
        const taskIdParam = searchParams.get('id');
        if (taskIdParam) {
            setTaskId(taskIdParam);
        }
        else {
            ErrorMessage('Radni zadatak ne može biti pronađen', '', () => window.location.href = '/');
        }
    }, [])

    useEffect(() => {
        taskId && fetchTask();
    }, [taskId])

    const fetchTask = async () => {
        let response = await http.get(`/workflow/get?id=${taskId}`);

        if (response.status === 200) {
            setTask(response.data);
            setLoadinig(false);
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const rejectWorkflow = async () => {
        let response = await http.get(`/Workflow/reject?id=${taskId}`)
        if (response.status === 200) {
            SuccessMessage('Radni zadatak je odbijen', '', window.location.href = '/workflow');
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const updateStatus = async (status) => {
        let taskObj = task;
        taskObj.status = status;
        let response = await http.post(`/Workflow/update`, taskObj)
        if (response.status === 200) {
            SuccessMessage('Radni zadatak ažuriran', '', () => setTask(response.data));
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }

    const finishWorkflow = async e => {
        let taskObj = task;
        taskObj.comment = commentRef.current.value;
        taskObj.status = 3;
        let response = await http.post(`/Workflow/update`, taskObj)
        if (response.status === 200) {
            SuccessMessage('Radni zadatak ažuriran', '', () => window.location.href = '/workflow');
        }
        else {
            ErrorMessage('Došlo je do neočekivane greške', '', () => window.location.reload());
        }
    }
    return <>
        <h2>Radni zadatak</h2>
        {loading && <LoadingSpinner></LoadingSpinner>}
        {!loading && <WorkflowTaskContainter task={task} updateStatus={updateStatus} handleReject={rejectWorkflow} showFinishTaskModal={() => setShowFinishTaskModal(true)}></WorkflowTaskContainter>}
        <Modal show={showFinishTaskModal} title={"Završavanje radnog zadatka"} handleClose={() => setShowFinishTaskModal(false)}>
            <MainContainer>
                <div className="form-group">
                    <label>Zaključak rada na zadatku</label>
                    <textarea className="form-control" ref={commentRef} rows="20" style={{ height: '300px' }}></textarea>
                </div>
            </MainContainer>
            <MainContainer>
                <div className="text-right">
                    <button className="btn btn-primary" onClick={finishWorkflow}>Završi zadatak</button>
                </div>
            </MainContainer>
        </Modal>
    </>
};

export default WorkflowTask;
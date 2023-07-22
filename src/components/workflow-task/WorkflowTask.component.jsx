import { MainContainer } from "../../common/layout/Layout.style";
import useAuth from "../../hooks/useAuth";

const WorkflowTaskContainter = ({ task, updateStatus, handleReject, showFinishTaskModal }) => {
    const { user } = useAuth();
    return <>
        <MainContainer>
            <div className="jumbotron">
                <p className="h2">{task.name}</p>
                <p className="lead">Opis radnog zadatka: {task.description}</p>
                <hr className="my-4" />
                {user.nameid === task.assignedUserId &&
                    (<>
                        {
                            task.status === 1 && <div className="text-inline">
                                <span>Prijavite se kako biste započeli rad na zadatku</span>
                                <div>
                                    <button className="btn btn-outline-danger" onClick={handleReject}>Odbij</button>
                                    <button className="btn btn-primary" onClick={() => updateStatus(2)}>Prihvati</button>
                                </div>
                            </div>
                        }
                        {task.status === 2 && <div className="text-inline">
                            <p>Rad na zadatku je započet</p>
                            <div>
                                <button className="btn btn-outline-danger" onClick={() => updateStatus(1)}>Odjavi se</button>
                            </div>
                        </div>
                        }
                        {(task.status !== 1 && task.status !== 2) && <div>
                            <p>Rad na zadatku je završen</p>
                            {task.description && <p className="lead">Zaključak radnog zadatka: {task.description}</p>}
                        </div>
                        }
                        <h2> Dokumenti</h2>

                        {task.status === 2 && <div className="text-right">
                            <p className="lead">
                                <a className="btn btn-primary" onClick={showFinishTaskModal} role="button">Završi zadatak</a>
                            </p>
                        </div>}
                    </>)
                }
            </div>
        </MainContainer >
    </>
}
export default WorkflowTaskContainter;
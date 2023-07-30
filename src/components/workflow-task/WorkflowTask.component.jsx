import Accordion from "../../common/accordidon/Accordion.component";
import { MainContainer } from "../../common/layout/Layout.style";
import useAuth from "../../hooks/useAuth";
import WorkflowDocument from './WorkflowDocument.component'

const WorkflowTaskContainter = ({ task, documents, updateStatus, handleReject, showFinishTaskModal }) => {
    const { user } = useAuth();
    return <>
        <MainContainer>
            <div className="jumbotron">
                <p className="h2">{task.name}</p>
                <p className="lead">Opis radnog zadatka: {task.description}</p>
                <hr className="my-4" />
                {user === task.assignedUserId &&
                    (<>
                        {
                            task.status === 1 && <div className="text-inline">
                                <span style={{ color: 'red' }}>Prijavite se kako biste započeli rad na zadatku</span>
                                <div>
                                    <button className="btn btn-outline-danger" onClick={handleReject}>Odbij</button>
                                    <button className="btn btn-primary" onClick={() => updateStatus(2)}>Prihvati</button>
                                </div>
                            </div>
                        }
                        {task.status === 2 && <div className="text-inline">
                            <p style={{ color: 'green' }}>Rad na zadatku je započet</p>
                            <div>
                                <button className="btn btn-outline-danger" onClick={() => updateStatus(1)}>Odjavi se</button>
                            </div>
                        </div>
                        }
                        {(task.status !== 1 && task.status !== 2) && <div>
                            <p style={{ color: 'green' }}>Rad na zadatku je završen</p>
                            {task.description && <p className="lead">Zaključak radnog zadatka: {task.description}</p>}
                        </div>
                        }

                        <h2> Dokumenti</h2>
                        <div className="text-right">
                            <p className="lead">
                                <a className="btn btn-primary-outline" href={`/add-documents-in-task?id=${task.id}`} role="button">+ Dodaj dokumente</a>
                            </p>
                        </div>
                        {documents?.length > 0 && <>
                            {documents.map(x => (
                                <Accordion key={x.id} id={x.id} label={x.title}>
                                    <WorkflowDocument documentProp={x}></WorkflowDocument>
                                </Accordion>
                            ))}
                        </>
                        }
                        <hr className="my-4" />
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
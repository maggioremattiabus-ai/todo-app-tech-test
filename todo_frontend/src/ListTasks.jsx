import {useEffect, useState} from "react";
function ListTasks({tasks, countTaskProp, deleteTask, modifyTask, taskCompleted}) {
    const [taskL, setTaskL] = useState([]);
    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [scadenza, setScadenza] = useState("");
    const [idC, setIdC] = useState();

    useEffect(() =>{
        setTaskL(tasks);
        console.log("Tasks locali settate prendendo le tasks globali");
        console.log(taskL);
    },[tasks]);

    const deleteTaskById = (id) =>{
        deleteTask(id);
    }

    const modifyTaskById = async(e) => {
        e.preventDefault();
        let taskF = {
            id: idC,
            titolo: titolo,
            descrizione: descrizione,
            scadenza: scadenza 
        }
        await modifyTask(taskF.id, taskF);
    }

    const taskCompletedById = (task) =>{
        taskCompleted(task);
    }
    
    const loadTask = (id, task) => {
        setTitolo(task.titolo);
        setScadenza(task.scadenza);
        setDescrizione(task.descrizione);
        setIdC(id);
        console.log("id dell'task caricato: " + idC);
    }

    const verifyColor = (task) =>{
        if(task.completato == true){
            return "list-component-completed";
        }else{
            let dataTask = new Date(task.scadenza);
            if(dataTask < new Date()){
                return "list-component-expired";
            }else{
                let differenza = dataTask - new Date();
                differenza = differenza/86400000;
                if(differenza < 3){
                    return "list-component-expiring";
                }else{
                    return "list-component";
                }
            }
        }
    }
    return ( 
        <>
            <form onSubmit={modifyTaskById} className="modify-task-form"> 
                <h2>Sezione Modifica Task</h2>
                <input className="" type="text" value={titolo} placeholder="Titolo task" onChange={(e) => setTitolo(e.target.value)}/>
                <input type="text" value={descrizione} placeholder="Descrizione task" onChange={(e) => setDescrizione(e.target.value)}/>
                <input type="datetime-local" value={scadenza} onChange={(e) => setScadenza(e.target.value)}></input> 
            <button type="submit">Aggiorna Task</button>
            </form>

            <div className="list-container"> 
                <h3>LISTA TASK</h3>
                <ul className="list-content"> 
                    {taskL.map((task, index) => 
                        <li key={index} className={verifyColor(task)}>
                            <div className="task-data"> 
                                <span>Titolo: {task.titolo}</span>
                                <span>Descrizione: {task.descrizione}</span>
                                <span>Scadenza: {task.scadenza}</span>
                            </div>  
                            <div className="div-buttons">
                                <button onClick={() => taskCompletedById(task)}>✔</button>
                                <button onClick={() => deleteTaskById(task.id)}>✘</button>
                                <button onClick={() => loadTask(task.id, task)}>✎</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default ListTasks
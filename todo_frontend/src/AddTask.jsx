import {useState} from "react";
function AddTask({addTask}){
    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [scadenza, setScadenza] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let task = {
        titolo: titolo,
        scadenza: scadenza,
        descrizione: descrizione,
        completato: false
        };

        if(task.titolo == "" || task.descrizione == "" || task.scadenza == undefined){
            setTitolo("");
            setDescrizione("");
        }else{
            addTask(task);// utilizza la funzione passata dal componente App (associata a addTask)
            
        }
    }
            
    return(
    <form onSubmit={handleSubmit} className="add-task-form">
        <h2>Sezione inserimento task</h2>
        <input className="" type="text" value={titolo} placeholder="Titolo task" onChange={(e) => setTitolo(e.target.value)}/>
        <input type="text" value={descrizione} placeholder="Descrizione task" onChange={(e) => setDescrizione(e.target.value)}/>
        <input type="datetime-local" value={scadenza} onChange={(e) => setScadenza(e.target.value)}></input>
        <button type="submit">Inserisci Task</button>
    </form>
);
}

export default AddTask
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask.jsx';
import ListTasks from './ListTasks.jsx';

function App() {

  const API_URL = "http://localhost:8080/api/tasks";
  const [tasks, setTasks] = useState([]);
  
  
  //FUNZIONI--------------------------------------
  const countTaskProp = (TList) => {
     let taskProp = {
       toComplete : 0,
       expired : 0,
       completed : 0
     }
     for(let i = 0; i < TList.length; i ++){
       if(TList[i].completato == true){
         taskProp.completed ++;
       }else{
         taskProp.toComplete ++;
         let data = new Date(TList[i].scadenza);
         if(new Date() > data){
          taskProp.expired++;
         }
       }
     }
      return taskProp;
   }

   const [LCount, setLCount] = useState(countTaskProp(tasks));

  const fetchTasks = async (t, s, c) => {
    try {
      //oggetto filtro
      let filtri = {
        titolo: t,
        scadenza: s,
        completato: c
      }; 

      // Chiama l'endpoint Spring Boot
      const response = await axios.get(API_URL, { params: filtri});
      setTasks(response.data);
      setLCount(countTaskProp(response.data));
    } catch (error) {
      console.error("Errore nel recupero dei task!", error);
    }
  };

  // Funzione per aggiungere un Task (chiamata POST)
  const addTask = async (newTask) => {
    await axios.post(API_URL, newTask);
    fetchTasks(null, null, null); // Ricarica la lista
  };

  const deleteTask = async (id) => {
    await axios.delete(API_URL, {params : {id: id}});
     fetchTasks(null,null,null);
  };

  //debugging
  const showTasks = (TList) => {
    for (let i = 0; i < TList.length; i++) {
      console.log(TList[i].titolo);
      console.log(TList[i].descrizione);
      console.log(TList[i].scadenza);
      console.log(TList[i].id)

    }
  }


  const modifyTask = async (id, task) =>{
    const API_URL_M = API_URL + "/" + id;
    await axios.put(API_URL_M, task);
    fetchTasks(null,null,null)
  }

  const taskCompleted = async (task) => {
    const API_URL_C = API_URL + "/completata";
    await axios.put(API_URL_C, task);
    fetchTasks(null,null,null)
  }

   

   
  
  //-----------------------------------------------------------------------------------


  //USE EFFECTS ----------------------------------------
  useEffect(() => {
    fetchTasks(null, null, null);
    console.log("montato il componente principale - APP");
  }, []);

  useEffect(() => {
    //si esegue ogni volta che tasks cambia (dopo il fetch iniziale)
     if (tasks.length > 0) {
      console.log("Stato 'tasks' aggiornato. Ecco i dati:");
        showTasks(tasks);
      } else {
        console.log("In questo istante la lista è vuota");
      }
  }, [tasks]);
  //--------------------------------------------------------------------------------------------------------
  return(
    <div className="App-Container"> 
      <h1 className="main-title">La Mia To-Do List</h1>
      <div className="main-content-wrapper">
        <AddTask addTask = {addTask}></AddTask>
        <ListTasks tasks = {tasks} countTaskProp = {countTaskProp} deleteTask = {deleteTask} modifyTask = {modifyTask} taskCompleted = {taskCompleted}></ListTasks>
        <div className="counter-and-modify-wrapper">
          <div className="task-counters">
            <span>Da completare:⠀{LCount.toComplete}</span>
            <span>Completate:⠀{LCount.completed}</span>
            <span>Scadute:⠀{LCount.expired}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/tasks") // trasferisce tutte le richieste "/api/tasks" qui
@CrossOrigin(origins = "http://localhost:5173/")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/home")
    public String home() {
        return "Questo è spring boot";
    }

    // Metodo generale per gestire la ricerca
    @GetMapping
    public List<Task> cercaTask(@RequestParam(required = false) String titolo,
            @RequestParam(required = false) LocalDateTime scadenza,
            @RequestParam(required = false) Boolean completato) {

        List<Task> list = new ArrayList<Task>();
        if (titolo != null) {
            list = this.taskService.findByTitolo(titolo);
        } else if (scadenza != null) {
            list = this.taskService.findByScadenza(scadenza);
        } else if (completato != null) {
            list = this.taskService.findByCompletato(completato);
        }
        list = this.taskService.taskRepository.findAll();
        return list;

    }

    @PostMapping
    public void saveTask(@RequestBody Task task) {
        this.taskService.saveTask(task);
    }

    @DeleteMapping
    public void deleteById(@RequestParam Long id) {
        this.taskService.deleteById(id);
    }

    @PutMapping("{id}")
    public void modifyTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> taskO = this.taskService.findById(id);// prendo il task tramite id
        if (taskO == null) {
            System.out.println(
                    "ERRORE NELLA MODIFICA DEL TASK ------------ IL TASK NON E' STATO RECUPERATO E RISULTA NULL NEL METODO DEL CONTROLLER");
        } else {
            Task taskA = taskO.get(); // Estrapolazione del Task dal container

            taskA.setTitolo((String) task.getTitolo());
            taskA.setScadenza((LocalDateTime) task.getScadenza());
            taskA.setCompletato((Boolean) task.getCompletato());
            taskA.setDescrizione((String) task.getDescrizione());

            this.taskService.saveTask(taskA);
        }
    }
    @PutMapping("/completata")
    public void completeTask(@RequestBody Task task){
        Optional<Task> taskO = this.taskService.findById(task.getId());

        if (taskO == null) {
            System.out.println(
                    "ERRORE NEL COMPLETAMENTO DEL TASK ------------ IL TASK NON E' STATO RECUPERATO E RISULTA NULL NEL METODO DEL CONTROLLER");
        } else {
            Task taskA = taskO.get(); // Estrapolazione del Task dal container
            taskA.setCompletato(true);
            this.taskService.saveTask(taskA);
        }
        
    }

}

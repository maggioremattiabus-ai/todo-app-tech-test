package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;

@Service
public class TaskService {
    
    public final TaskRepository taskRepository;
    //Costruttore con DI
    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    } 



    public List<Task> findByTitolo(String titolo){
        return this.taskRepository.findByTitolo(titolo);
    }

    public List<Task> findByScadenza(LocalDateTime s){
        return this.taskRepository.findByScadenza(s);
    }

    public List<Task> findByCompletato(Boolean b){
        return this.taskRepository.findByCompletato(b);
    }

    public Optional<Task> findById(Long id){
        return this.taskRepository.findById(id);
    }

    public void saveTask(Task task){
        this.taskRepository.save(task);
    }

    public void modifyTask(){
        
    }

    public void deleteById(Long id){
        this.taskRepository.deleteById(id);
    }
}

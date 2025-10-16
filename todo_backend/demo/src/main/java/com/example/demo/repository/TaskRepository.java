package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Task;




public interface TaskRepository extends JpaRepository<Task,Long> {
     List<Task> findByScadenza(LocalDateTime scadenza);
     List<Task> findByCompletato(Boolean completato);
     List<Task> findByTitolo(String titolo);
     Optional<Task> findById(Long id); // gestisce l'opzione di avere o non avere valori non - nulli

         
    
} 

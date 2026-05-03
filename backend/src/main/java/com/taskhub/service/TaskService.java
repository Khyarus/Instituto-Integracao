package com.taskhub.service;

import com.taskhub.model.Task;
import com.taskhub.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public List<Task> findAll() { return repository.findAll(); }
    public Optional<Task> findById(Long id) { return repository.findById(id); }
    public Task save(Task task) { return repository.save(task); }
    public void deleteById(Long id) { repository.deleteById(id); }
}

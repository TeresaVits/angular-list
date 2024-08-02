import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  clearAll() {
    if (confirm('Tem certeza que quer deletar tudo?')) {
      this.todoService.clearAll();
    }
  }

  get pendingTasks() {
    return this.todos.filter(todo => todo.status === 'pending');
  }

  get inProgressTasks() {
    return this.todos.filter(todo => todo.status === 'inProgress');
  }

  get completedTasks() {
    return this.todos.filter(todo => todo.status === 'completed');
  }
}

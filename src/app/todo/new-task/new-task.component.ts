import { Component } from '@angular/core';
import { TodoService } from '../../shared/services/todo.service';
import { Todo } from '../../shared/models/todo.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';
  newTaskCategory: 'casa' | 'estudo' | 'trabalho' | '' = '';
  newTaskDueDate: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    if (this.newTaskTitle.trim() !== '' && this.newTaskCategory && this.newTaskDueDate) {
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle,
        status: 'pending',
        category: this.newTaskCategory,
        dueDate: this.newTaskDueDate
      };

      this.todoService.addTodo(newTodo);
      this.newTaskTitle = '';
      this.newTaskCategory = '';
      this.newTaskDueDate = '';
    }
  }
}

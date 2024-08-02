import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  providers: [DatePipe] // Adicione o DatePipe como provedor
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService, private datePipe: DatePipe) {}

  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.deleteTodo(this.todo.id);
      this.deletedTodo.emit(this.todo.id);
    }
  }

  onTaskChecked(): void {
    if (this.todo.status === 'pending') {
      this.todo.status = 'inProgress';
    } else if (this.todo.status === 'inProgress') {
      this.todo.status = 'completed';
    } else {
      this.todo.status = 'pending';
    }
    this.todoService.updateTodo(this.todo);
  }

  formatDueDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }
}

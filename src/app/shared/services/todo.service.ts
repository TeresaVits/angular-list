import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos!: Todo[];

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const todosJson = localStorage.getItem('todos');
    this.todos = todosJson ? JSON.parse(todosJson) : [
      { id: 1, title: 'Fazer atualizações no projeto', status: 'completed', category: 'trabalho' },
      { id: 2, title: 'Fazer jantar', status: 'completed', category: 'casa' },
      { id: 3, title: 'Planejar apresentação', status: 'pending', category: 'estudo' },
      { id: 4, title: 'Estudar Angular', status: 'pending', category: 'estudo' },
      { id: 5, title: "Fazer Skin Care", status: 'pending', category: 'casa' }

    ];
    this.sortTodos();
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  private updateLocalStorageAndSave(): void {
    this.saveToLocalStorage();
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo);
    this.sortTodos();
    this.updateLocalStorageAndSave();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  getTodoNewId(): number {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }

  sortTodos() {
    this.todos.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') {
        return 1;
      } else if (a.status !== 'completed' && b.status === 'completed') {
        return -1;
      } else if (a.status === 'inProgress' && b.status === 'pending') {
        return 1;
      } else if (a.status === 'pending' && b.status === 'inProgress') {
        return -1;
      } else {
        return 0;
      }
    });
  }

  clearAll() {
    this.todos = [];
    this.updateLocalStorageAndSave();
  }

}

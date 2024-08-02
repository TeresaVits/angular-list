import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private firestore: AngularFirestore) {}

  getTodos(): Observable<Todo[]> {
    return this.firestore.collection<Todo>('todos').valueChanges();
  }

  addTodo(newTodo: Todo): void {
    newTodo.id = this.firestore.createId(); // Cria um ID único para o novo documento
    this.firestore.collection('todos').doc(newTodo.id).set(newTodo);
  }

  updateTodo(updatedTodo: Todo): void {
    this.firestore.collection('todos').doc(updatedTodo.id).update(updatedTodo);
  }

  deleteTodo(todoId: string): void {
    this.firestore.collection('todos').doc(todoId).delete();
  }

  clearAll(): void {
    this.firestore.collection('todos').get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        this.firestore.collection('todos').doc(doc.id).delete();
      });
    });
  }
}

// src/app/models/todo.model.ts
export interface Todo {
  id: string; // Alterado para string
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  category: 'casa' | 'estudo' | 'trabalho';
  dueDate: string; 
}

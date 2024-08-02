export interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  category: 'casa' | 'estudo' | 'trabalho';
  dueDate: string; 
}

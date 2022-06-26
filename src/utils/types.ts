export type Store = {
  idCounter: number;
  todos: TodoList;
  newItem: string;
  filter: Filters;
};

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export enum Filters {
  All = 'All',
  Active = 'Active',
  Done = 'Done'
};

export type TodoList = Array<Todo>;

export type TodoId = number | string

export type Priority = 'High' | 'Medium' | 'Low'

export interface Todo {
  id: TodoId
  text: string
  priority: Priority
  completed: boolean
  dueDate: string
}

export interface NewTodo {
  text: string
  priority: Priority
  dueDate: string
}

export interface UpdateTodoPayload {
  id: TodoId
  changes: Partial<Omit<Todo, 'id'>>
}

export interface TodosState {
  items: Todo[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

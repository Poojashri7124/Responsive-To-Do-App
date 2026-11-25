
import type { Todo, TodoId, NewTodo } from './types/todo'

const BASE_URL = import.meta.env.VITE_API_URL;

// One helper: every request goes through here, so res.ok is always checked
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return (await res.json()) as T
}

export async function getTodos(): Promise<Todo[]> {

  return request<Todo[]>(BASE_URL)
}

export function addTodo(
  todo: NewTodo & { completed: boolean }
): Promise<Todo> {
  return request<Todo>(BASE_URL, {
    method: 'POST', // returns the create todo 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
}

export function updateTodo(
  id: TodoId,
  changes: Partial<Omit<Todo, 'id'>>
): Promise<Todo> {
  return request<Todo>(`${BASE_URL}/${id}`, {
    method: 'PATCH', //updated tasks in todo list
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
}

export function deleteTodo(id: TodoId): Promise<unknown> {
  return request<unknown>(`${BASE_URL}/${id}`, { method: 'DELETE' }) //delete the task fro todo list
}

export function getTodo(id: TodoId): Promise<Todo> {
  return request<Todo>(`${BASE_URL}/${id}`)
}

const BASE_URL = 'http://localhost:3001/todos'

// One helper: every request goes through here, so res.ok is always checked
async function request(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}

export async function getTodos() {
  
  await new Promise((resolve) => setTimeout(resolve, 3000)) //Loading message for 3 seconds
  return request(BASE_URL)
}

export function addTodo(todo) {
  return request(BASE_URL, {
    method: 'POST', // returns the create todo 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
}

export function updateTodo(id, changes) {
  return request(`${BASE_URL}/${id}`, {
    method: 'PATCH', //updated tasks in todo list
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
}

export function deleteTodo(id) {
  return request(`${BASE_URL}/${id}`, { method: 'DELETE' }) //delete the task fro todo list
}
export function getTodo(id){
  return request(`${BASE_URL}/${id}`)
}
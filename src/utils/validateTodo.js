import { getToday } from './date'

// form = { text, dueDate }
// todos = all todos (to find duplicates)
// current = the todo being edited (only on the detail page)
// Returns an errors object, e.g. { text: "Task can't be empty" }
export function validate(form, todos, current = null) {
  const errors = {}
  const text = form.text.trim()

  if (text === '') {
    errors.text = "Task can't be empty"
  } else if (text.length < 3) {
    errors.text = 'Task must be at least 3 characters'
  } else {
    const duplicate = todos.some(
      (todo) =>
        (!current || todo.id !== current.id) &&
        todo.text.trim().toLowerCase() === text.toLowerCase()
    )
    if (duplicate) {
      errors.text = 'This task already exists'
    }
  }

  // due date is optional, but it can't be in the past
  // (when editing, an old date that was not changed is fine)
  const dateChanged = !current || form.dueDate !== current.dueDate
  if (form.dueDate && dateChanged && form.dueDate < getToday()) {
    errors.dueDate = "Due date can't be in the past"
  }

  return errors
}
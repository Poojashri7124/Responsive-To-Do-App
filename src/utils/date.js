// Today as "YYYY-MM-DD" in the user's own timezone.
// Same format as <input type="date">, so two dates can be compared as text.
export function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// "2026-11-12" -> "12 Nov 2026"
export function formatDate(dateString) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
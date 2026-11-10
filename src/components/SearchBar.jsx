
function SearchBar({ query, onChange }) {
  return (
    <div className="w-full">
      <input
        type="search"
        placeholder="Search tasks"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-indigo-900"
      />
    </div>
  )
}

export default SearchBar

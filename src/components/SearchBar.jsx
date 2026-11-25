import './SearchBar.css'

function SearchBar({ query, onChange }) {
  return (
    <div className="search">
      <input
        className="search-input"
        type="search"
        placeholder="Search tasks"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  )
}

export default SearchBar
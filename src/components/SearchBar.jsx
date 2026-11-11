function SearchBar({ query, onChange }) {
  return (
    <div className="px-6.5 pb-4 md:px-8">
      <input
        className="h-11 w-full rounded-[10px] border border-[#d9d6f5] bg-white px-4 text-[15px] text-[#1e1b3a] placeholder:text-[#8a86a8] focus:border-[#6366f1] focus:outline-none dark:border-[#3a3860] dark:bg-[#26243d] dark:text-[#ecebff]"
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
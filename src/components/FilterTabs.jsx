import './FilterTabs.css'

function FilterTabs({ tabs, activeTab }) {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={tab === activeTab ? 'tab tab-active' : 'tab'}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default FilterTabs

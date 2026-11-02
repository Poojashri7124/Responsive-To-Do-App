import './FilterTabs.css'

function FilterTabs({ tabs, activeTab , onChange}) {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={tab === activeTab ? 'tab tab-active' : 'tab'}
          onClick = {() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default FilterTabs

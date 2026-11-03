import './FilterTabs.css'

function FilterTabs({ tabs, activeTab , onChange}) {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab} //unique key for each tab
          type="button"
          className={tab === activeTab ? 'tab tab-active' : 'tab'} // if tab and active tab is same then add active class to it
          onClick = {() => onChange(tab)} //on click calls the onChange function and passes the tab name to it
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default FilterTabs

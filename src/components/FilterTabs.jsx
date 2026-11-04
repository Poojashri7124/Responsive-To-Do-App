import { NavLink } from 'react-router-dom'
import './FilterTabs.css'

// Tabs are NavLinks now: the URL decides which one is highlighted
function FilterTabs({ tabs }) {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default FilterTabs

import { NavLink } from 'react-router-dom'

function FilterTabs({ tabs }) {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3 dark:border-gray-700">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 text-sm font-medium transition-colors
            ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default FilterTabs

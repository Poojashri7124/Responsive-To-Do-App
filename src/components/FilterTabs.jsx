import { NavLink } from 'react-router-dom'

const tabBase = 'inline-block rounded-lg px-[13px] py-[7px] text-sm'
const tabActive =
  'bg-[#eeedff] font-semibold text-[#4f46e5] dark:bg-[#2d2a55] dark:text-[#a5a0ff]'
const tabNormal = 'text-[#6b6890] dark:text-[#a6a3c7]'

// Tabs are NavLinks: the URL decides which one is highlighted
function FilterTabs({ tabs }) {
  return (
    <nav className="flex flex-wrap gap-1.5 border-b border-[#efeefa] px-6.5 py-4 md:px-8 dark:border-[#2c2a48]">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `${tabBase} ${isActive ? tabActive : tabNormal}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default FilterTabs
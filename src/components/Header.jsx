import './Header.css'

function Header({ title, date }) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <p className="header-date">{date}</p>
    </header>
  )
}

export default Header

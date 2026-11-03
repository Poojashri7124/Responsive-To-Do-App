import './Header.css'

function Header({ title, date }) {
  return (
    <header className="header">
      {/*displays the title */}
      <h1 className="header-title">{title}</h1>
      
      {/*shows date in header */}
      <p className="header-date">{date}</p>   
    </header>
  )
}

export default Header

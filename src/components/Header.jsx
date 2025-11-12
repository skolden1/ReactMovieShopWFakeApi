import { Link } from "react-router-dom"

const Header = (props) => {



  function searchMovie(formData){
    const searchbarInput = formData.get("searchbar")
    props.setSearchbarInput(searchbarInput)

  }


  return (
    <div className="header-container">
        <Link to="/admin" className="adminLink"><p>Adminvy</p></Link>
      <form action={searchMovie}>
      <label htmlFor="searchbar">Sök film</label>
      <input name="searchbar" id="searchbar" />
      <button type="submit">{props.searchbarInput ? "Visa alla filmer" : "Sök"}</button>
      </form>
    </div>
  )
}
export default Header
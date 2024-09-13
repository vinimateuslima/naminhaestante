import './Search.css'

import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="search">
        <div className="search-books">
        <input type="search" name="" id="" />
        <IoSearch className="search-icon" />
        </div>
    </div>
  )
}

export default Search
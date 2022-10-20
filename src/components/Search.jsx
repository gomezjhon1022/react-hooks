import React from 'react';
import './Search.css';

const Search = ({search, searchInput, handleSearch}) => {
  return (
    <div className='search'>
        <input placeholder='Search character' type="text" value={search} ref={searchInput} onChange={handleSearch}/>
      </div>
  )
}

export default Search
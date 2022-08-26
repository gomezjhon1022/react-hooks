import React, { useState, useEffect, useContext, useReducer, useMemo, useRef} from 'react'
import {ThemeContext} from '../context/ThemeContext';
import './Characters.css';

const initialState = {
  favourites: [],
}
const favouriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITE':
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    default:
      return state;
  }
}

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const {theme} = useContext(ThemeContext);
  const [favourites,dispatch] = useReducer(favouriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  },[])
  const handleClick = favourite => {
    dispatch ({type: 'ADD_TO_FAVOURITE', payload: favourite})
  }
  const handleSearch = () => {
    setSearch(searchInput.current.value)
  }
  const filteredUsers = useMemo(() =>
  characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }),
  [characters, search]
  )
  return (

    <div className={theme?`header-dark`:`header-light`}>
      <div className='search'>
        <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
      </div>
      {favourites.favourites.length > 0 && <h1 className={theme?`dark`:`light`} >Favourites</h1>}
      <div className={'favourites-image-container'}>
        {favourites.favourites.map(favourite => (
          <img key={favourite.id} src={favourite.image}></img>
        ))}
      </div>
      <div className={'characters'}>
        {filteredUsers.map(character => (
          <div className='card' key={character.id}>
            <img  className='image' src={character.image} alt={`Imagen de ${character.name}`}></img>
            <h2 >{character.name}</h2>
            <p>Especie: {character.species}</p>
            <p> Estatus: {character.status}</p>
            <button type='button' onClick={() => handleClick(character)}>Agregar a favoritos</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Characters
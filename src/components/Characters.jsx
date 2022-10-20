import React, { useState, useContext, useReducer, useMemo, useRef, useCallback} from 'react'
import {ThemeContext} from '../context/ThemeContext';
import Search from './Search';
import './Characters.css';
import useCharacters from '../hooks/useCharacters';

const initialState = {
  favourites: [],
}
const API = 'https://rickandmortyapi.com/api/character/'
const favouriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITE':
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
      case 'DELETE_TO_FAVOURITE':
        return {
          ...state,
          favourites: [...state.favourites.slice(0,action.payload)]
        };
    default:
      return state;
  }
}

const Characters = () => {
  const {theme} = useContext(ThemeContext);
  const [favourites,dispatch] = useReducer(favouriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);
  const characters = useCharacters(API);
  const handleClick = favourite => {
    dispatch ({type: 'ADD_TO_FAVOURITE', payload: favourite})
  }
  const handleClickoff = favourite => {
    dispatch ({type: 'DELETE_TO_FAVOURITE', payload: favourite})
  }
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])
  const filteredUsers = useMemo(() =>
  characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }),
  [characters, search]
  )
  return (

    <div className={theme?`header-dark`:`header-light`}>
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>
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
            { favourites.favourites.length >0
              ?favourites.favourites.map(personaje => (
                personaje.id===(character.id)
                ?<button type='button'  onClick={() => handleClickoff(character)}>Eliminar de favoritos</button>
                :<button type='button'  onClick={() => handleClick(character)}>Agregar a favoritos</button>
              ))
              :<button type='button'  onClick={() => handleClick(character)}>Agregar a favoritos</button>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Characters
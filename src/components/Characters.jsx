import React, { useState, useEffect, useContext, useReducer} from 'react'
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
  const [favourites,dispatch] = useReducer(favouriteReducer, initialState)
  console.log(favourites)
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  },[])
  const handleClick = favourite => {
    dispatch ({type: 'ADD_TO_FAVOURITE', payload: favourite})
  }
  return (
    <div className={theme?`header-dark`:`header-light`}>
      {favourites.favourites.length > 0 && <h1 className={theme?`dark`:`light`} >Favourites</h1>}
      <div className={'favourites-image-container'}>
        {favourites.favourites.map(favourite => (
          <img key={favourite.id} src={favourite.image}></img>
        ))}
      </div>
      <div className={'characters'}>
        {characters.map(character => (
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
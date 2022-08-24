import React, { useState, useEffect} from 'react'
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  },[])
  return (
    <div className='characters'>
      {characters.map(character => (
        <div className='card'>
          <img  className='image' src={character.image} alt={`Imagen de ${character.name}`}></img>
          <h2 key={character.id}>{character.name}</h2>
          <p>Especie: {character.species}</p>
          <p> Estatus: {character.status}</p>

        </div>
      ))}
    </div>
  )
}

export default Characters
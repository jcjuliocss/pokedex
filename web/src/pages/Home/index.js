import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Home(){
    const history = useHistory()
    const [pokemonList, setPokemonList] = useState([])
    const baseUrlApi = 'https://pokeapi.co/api/v2/pokemon'
    const [currentUrl, setCurrentUrl] = useState(baseUrlApi)
    const [nextUrl, setNextUrl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')
    
    useEffect(() => {
        function getPokemons(){
            api.get(currentUrl)
            .then(response => {
                setPokemonList(response.data.results);
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);
            })
        }

        async function waitPokemons(){
            await getPokemons()
        }

        waitPokemons()
    }, [currentUrl])
    
    function openPokemon(url){
        localStorage.setItem('pokemon_url', url)

        history.push('detail')
    }

    function next(){
        setCurrentUrl(nextUrl)
    }

    function prev(){
        setCurrentUrl(prevUrl)
    }

    function Buttons(){
        if(nextUrl && prevUrl){
            return(
                <div className="navigation">
                    <button onClick={prev}>
                        Anteriores
                    </button>
                    <button onClick={next}>
                        Próximos
                    </button>
                </div>
            )
        }else if(nextUrl){
            return(
                <div className="navigation">
                    <button onClick={next}>
                        Próximos
                    </button>
                </div>
            )
        }

        return null
    }

    return(
        <div className="home-container">
            <header>
                <h1>Pokédex</h1>
            </header>

            <ul>
                {pokemonList.map(pokemon => (
                    <li key={pokemon.url}>
                        <button onClick={() => openPokemon(pokemon.url)}>
                            {pokemon.name}
                        </button>
                    </li>
                ))}
            </ul>
            <Buttons />
        </div>
    )
}
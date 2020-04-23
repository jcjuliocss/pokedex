import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function Home(){
    const history = useHistory()
    const [pokemonList, setPokemonList] = useState([])
    const [pokemonNameOrId, setPokemonNameOrId] = useState('')
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

    function spriteUrl(url){
        const array_pokemon_url = url.split("/")
        const id = array_pokemon_url[array_pokemon_url.length - 2]
        const sprite_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
        return sprite_url
    }

    function pokemonSearch(event){
        event.preventDefault()

        const pokemonSearchUlr = baseUrlApi + '/' + pokemonNameOrId

        openPokemon(pokemonSearchUlr)
    }

    return(
        <div className="home-container">
            <header>
                <h1>Pokédex</h1>
                <form onSubmit={pokemonSearch} className="search-pokemon">
                    <button className="btn-search-pokemon" type="submit">
                        <FiSearch size={17} color="#737380" />
                    </button>
                    <input
                        className="input-pokemon-name"
                        placeholder="Nome ou ID do Pokémon"
                        value={pokemonNameOrId}
                        onChange={event => setPokemonNameOrId(event.target.value)}
                    />
                </form>
            </header>

            <ul>
                {pokemonList.map(pokemon => (
                    <li key={pokemon.url}>
                        <button onClick={() => openPokemon(pokemon.url)}>
                            <img src={spriteUrl(pokemon.url)} alt={pokemon.name} />
                            <p>{pokemon.name}</p>
                        </button>
                    </li>
                ))}
            </ul>
            <Buttons />
        </div>
    )
}
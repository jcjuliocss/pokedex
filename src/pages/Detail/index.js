import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Detail(){
    const history = useHistory()

    const [name, setName] = useState('')
    const [sprite, setSprite] = useState('')
    const [pokeId, setPokeId] = useState(0)
    const [height, setHeight] = useState(0.0)
    const [weight, setWeight] = useState(0.0)

    useEffect(() => {
        async function getPokemon(){
            const urlPokemon = localStorage.getItem('pokemon_url')
            try{
                const response = await api.get(urlPokemon)
                setName(response.data.name)
                setSprite(response.data.sprites.front_default)
                setHeight(response.data.height)
                setPokeId(response.data.id)
                setWeight(response.data.weight)
            }catch{
                alert('Pokémon não encontrado.')
                back()
            }
        }

        getPokemon()
    }, [])

    function back(){
        localStorage.removeItem('pokemon_url')
        history.push('/')
    }

    return(
        <div className="detail-container">
            <div className="content">
                <section>
                    <img src={sprite} alt={name}/>
                    <ul>
                        <li>
                            <strong>Pokémon ID: </strong>
                            <span>{pokeId}</span>
                        </li>
                        <li>
                            <strong>Nome: </strong>
                            <span>{name}</span>
                        </li>
                        <li>
                            <strong>Altura: </strong>
                            <span>{height/10}m</span>
                        </li>
                        <li>
                            <strong>Peso: </strong>
                            <span>{weight/10}kg</span>
                        </li>
                    </ul>
                    <button onClick={back}>voltar</button>
                </section>
            </div>
        </div>
    )
}
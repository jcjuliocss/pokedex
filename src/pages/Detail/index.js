import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Detail(){
    const history = useHistory()

    const [name, setName] = useState('')
    const [height, setHeight] = useState(0.0)
    const [sprite, setSprite] = useState('')

    useEffect(() => {
        function getPokemon(){
            const urlPokemon = localStorage.getItem('pokemon_url')
            api.get(urlPokemon).then(response => {
                setName(response.data.name)
                setSprite(response.data.sprites.front_default)
                setHeight(response.data.height)
            })
        }

        async function waitPokemon(){
            await getPokemon()
        }

        waitPokemon()
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
                    <strong>Nome:</strong>
                    <p>{name}</p>
                    <strong>Altura:</strong>
                    <p>{height}</p>
                    <button onClick={back}>voltar</button>
                </section>
            </div>
        </div>
    )
}
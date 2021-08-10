import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

const Civilization = () => {

    const {id} = useParams()

    const [civilization, setCivilization] = useState([])

    useEffect(() => {
        getData()
    })

    const getData = async () => {
        const data = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/'+id)
        const tmp = await data.json()
        setCivilization(tmp)
    }

    return (
        <div>
            <h3>{civilization.name}</h3><br/>
            <p><b>Expansion:</b> {civilization.expansion}</p>
            <p><b>Army Type:</b> {civilization.army_type}</p>
            <p><b>Team Bonus:</b> {civilization.team_bonus}</p>
            <p><b>Civilization Bonus:</b></p>
            <ul>
                {
                    civilization.civilization_bonus && civilization.civilization_bonus.map(item => (
                        <li>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Civilization
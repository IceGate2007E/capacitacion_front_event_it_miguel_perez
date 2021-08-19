import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {CircularProgress, Grid} from '@material-ui/core'

const Civilization = () => {

    const {id} = useParams()

    const [civilization, setCivilization] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/'+id).
            then( res => {
                setLoading(false)
                return res
            })
        const tmp = await data.json()
        setCivilization(tmp)
    }

    if (loading) return (
        <Grid container justify='center'>
            <CircularProgress color='primary' size={120}/>)
        </Grid>
    )

    civilization.name && (document.title = civilization.name)

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
import React, {useState, useEffect, Fragment} from 'react'
import {useParams} from 'react-router-dom'

import {CircularProgress, Grid, Typography} from '@material-ui/core'

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
            <CircularProgress color='primary' size={120}/>
        </Grid>
    )

    civilization.name && (document.title = civilization.name)

    return (
        <Fragment>
            <Typography variant='h4' color='primary' gutterBottom>
                {civilization.name}
            </Typography>
            <Typography variant='h6' color='primary'>
                <b>Expansion: </b>
            </Typography>
            <Typography variant='body1' paragraph>
                    {civilization.expansion}
            </Typography>
            <Typography variant='h6' color='primary'>
                <b>Army Type: </b>
            </Typography>
            <Typography variant='body1' paragraph>
                    {civilization.army_type}
            </Typography>
            <Typography variant='h6' color='primary'>
                <b>Team Bonus: </b>
            </Typography>
            <Typography variant='body1' paragraph>
                    {civilization.team_bonus}
            </Typography>
            <Typography variant='h6' color='primary'>
                <b>Civilization Bonus: </b>
            </Typography>{
                civilization.civilization_bonus && civilization.civilization_bonus.map(item => (
                    <Typography variant='body1'>
                        {item}
                    </Typography>
                ))
            }
        </Fragment>
    )
}

export default Civilization
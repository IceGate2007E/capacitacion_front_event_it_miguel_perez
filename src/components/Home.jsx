import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress, Grid} from '@material-ui/core'

const Home = () => {

    const [civilizations, setCivilizations] = useState([])
    const [page, setPage] = useState(0)
    const [quantity, setQuantity] = useState(10)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations').
            then( res => {
                setLoading(false)
                return res
            })
        const tmp = await data.json()
        setCivilizations(tmp.civilizations)
    }

    if (loading) return (
        <Grid container justify='center'>
            <CircularProgress color='secondary' size={120}/>)
        </Grid>
    )

    return (
        <div>
            <h1>Age of Empires II - Civilizations</h1>
            <table>
                <thead>
                    <tr>
                        <th width="32">ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>{
                    civilizations.slice(page*quantity, (page+1)*quantity).map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <Link to={'/'+item.id} style={{textDecoration: 'none', color: 'grey'}}>
                                    {item.name}
                                </Link>
                            </td> 
                        </tr>
                    ))
                }</tbody>
            </table>
            <br></br>
            <button onClick={() => {if (page>0) setPage(page-1)}}>Prev</button>
            <button onClick={() => {if (page<Math.floor(civilizations.length/quantity)) setPage(page+1)}}>Next</button>
            <select onChange={(event) => {
                setPage(Math.floor(page*(quantity/event.target.value)))
                setQuantity(event.target.value)
                }}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
        </div>
    )
}

export default Home;
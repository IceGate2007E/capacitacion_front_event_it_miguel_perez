import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

    const [civilizations, setCivilizations] = useState([])
    const [page, setPage] = useState(0)
    const [quantity, setQuantity] = useState(10)
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')
        const tmp = await data.json()
        setCivilizations(tmp.civilizations)
    }

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
                setPage(0)
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
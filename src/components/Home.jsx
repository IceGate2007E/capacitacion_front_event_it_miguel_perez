import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

    const [civilizations, setCivilizations] = useState([])

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
                    civilizations.map(item => (
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
        </div>
    )
}

export default Home;
import React, {useEffect, useState, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress, Grid, Typography} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Select, MenuItem, InputLabel} from '@material-ui/core'


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
            <CircularProgress color='primary' size={120}/>)
        </Grid>
    )

    document.title = 'Civilizations'

    return (
        <Fragment>
            <Typography variant='h3' color='primary' gutterBottom>
                Age of Empires II Civilizations
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='h6' color='primary'>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6' color='primary'>
                                    Name
                                </Typography>
                            </TableCell>  
                        </TableRow>
                    </TableHead>
                    <TableBody>{
                        civilizations.slice(page*quantity, (page+1)*quantity).map(item => (
                            <TableRow>
                                <TableCell size='small' width={20} align='right'>
                                    {item.id}
                                </TableCell>
                                <TableCell size='small'>
                                    <Link to={'/'+item.id} style={{textDecoration: 'none'}}>
                                        <Typography variant="body1" color="textPrimary">
                                            {item.name}
                                        </Typography>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }</TableBody>
                </Table>
            </TableContainer>
            <Grid container justify='center'>
                <Button
                    color='primary'
                    variant='contained'
                    disabled={page === 0}
                    onClick={() => {setPage(page-1)}}>
                    Prev
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    disabled={civilizations && page === Math.floor(civilizations.length/quantity)}
                    onClick={() => {setPage(page+1)}}>
                    Next
                </Button>
            </Grid>
            <Grid container alignItems='center' justify='flex-end'>
                <Typography variant='h6' color='primary'>
                    Rows 
                </Typography>
                <Select variant='outlined' value={quantity} onChange={(event) => {
                    setPage(Math.floor(page*(quantity/event.target.value)))
                    setQuantity(event.target.value)
                    }}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </Grid>
        </Fragment>
    )
}

export default Home;
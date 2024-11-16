import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

export const Home = () => {
    return (
        <>
            <Navbar />
            <Box height={30} />
            <Box component="main" sx={{ display: 'flex' }}>
                <Sidenav />
                <h1>Home</h1>
            </Box>
        </>
    )
}

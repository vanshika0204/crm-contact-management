import React from 'react'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar';
import { Box, Typography} from '@mui/material';

export const Home = () => {
    return (
        <>
            <Navbar />
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    p: 3,
                    bgcolor: 'linear-gradient(135deg, #f0f4f8, #ffffff)',
                    borderRadius: 2,
                    boxShadow: 3,
                    marginBlock: 8,
                    minHeight: 'calc(100vh - 64px)', 
                }}
            >
                {/* Side Navigation */}
                <Sidenav />

                {/* Page Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'white',
                        p: 2,
                        // borderRadius: 2,
                        // boxShadow: 4, 
                        // transition: 'box-shadow 0.3s ease-in-out', 
                        // '&:hover': {
                        //     boxShadow: 6, 
                        // },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                            mb: 2, 
                            // textAlign: 'center', 
                        }}
                    >
                        Home
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

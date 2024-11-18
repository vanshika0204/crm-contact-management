import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import { Box, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ContactList } from '../components/ContactList';

export const Contacts = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Top Navigation Bar */}
            <Navbar />

            {/* Main Content Layout */}
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    p: 3,
                    bgcolor: 'linear-gradient(135deg, #f0f4f8, #ffffff)', // Subtle gradient background
                    borderRadius: 2,
                    boxShadow: 3,
                    marginBlock: 8,
                    minHeight: 'calc(100vh - 64px)', // Ensures content takes up the full viewport height minus navbar height
                }}
            >
                {/* Side Navigation */}
                <Sidenav />

                {/* Page Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'white',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 4, // Deeper shadow for the content box
                        transition: 'box-shadow 0.3s ease-in-out', // Smooth hover effect
                        '&:hover': {
                            boxShadow: 6, // Enhanced shadow on hover
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                            mb: 2, // Adds margin below the title
                            textAlign: 'center', // Centers the title
                        }}
                    >
                        Contacts
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            textAlign: 'center', // Centers the description text
                            mb: 4, // Adds margin below the description
                        }}
                    >
                        Manage all your contacts here. You can add, edit, or delete contacts easily using the options provided.
                    </Typography>
                    {/* all contacts list */}
                    <ContactList />
                </Box>
            </Box>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 80,
                    right: 80,
                    boxShadow: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)', // Slight scaling effect on hover
                        boxShadow: 6,
                    },
                }}
                onClick={() => navigate('/add-contact')}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

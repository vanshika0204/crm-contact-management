import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import { Box, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Contacts = () => {
    const navigate = useNavigate(); // Initialize the navigate function

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
                    gap: 3, // Adds spacing between child components
                    p: 3, // Padding around the container
                    bgcolor: '#f5f5f5', // Light background color for better contrast
                    borderRadius: 2, // Rounded corners
                    boxShadow: 3, // Subtle shadow for depth
                    marginBlock: 4, // Space from top and bottom
                }}
            >
                {/* Side Navigation */}
                <Sidenav />

                {/* Page Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'white', // White background for content area
                        p: 4, // Padding inside the content area
                        borderRadius: 2, // Rounded corners
                        boxShadow: 2, // Slight shadow for depth
                    }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            color: 'primary.main', // Use the theme's primary color
                            fontWeight: 'bold', // Make the header bold
                        }}
                    >
                        Contacts
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage all your contacts here. You can add, edit, or delete contacts easily using the options provided.
                    </Typography>
                </Box>
            </Box>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 16, // Adjust to align with Material Design guidelines
                    right: 16,  // Adjust to align with Material Design guidelines
                }}
                onClick={() => navigate('/add-contact')} // Navigate to the Add Contact page
            >
                <AddIcon />
            </Fab>
        </>
    );
};

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { backend_url } from "../App";

export const ContactList = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const navigate = useNavigate();

  // Fetch contacts from the server
  const fetchInfo = () => {
    fetch(`${backend_url}/contacts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }
        return res.json();
      })
      .then((data) => setAllContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove contact from the server
  const removeContact = async (id) => {
    try {
      const response = await fetch(`${backend_url}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      // Refresh the contact list after deletion
      fetchInfo();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedContactId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContactId(null);
  };

  const handleEdit = () => {
    navigate(`/edit-contact/${selectedContactId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedContactId) {
      removeContact(selectedContactId);
    }
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "1000px",
        mx: "auto",
        mt: 4,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Image</th>
            <th style={tableHeaderStyle}>First Name</th>
            <th style={tableHeaderStyle}>Last Name</th>
            <th style={tableHeaderStyle}>Phone No.</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Company</th>
            <th style={tableHeaderStyle}>Job Title</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allContacts.map((contact) => (
            <tr key={contact.id} style={tableRowStyle}>
              <td style={tableCellStyle}>
                <Link to={`/contact/${contact.id}`}>
                  <Avatar
                    src={`${backend_url}${contact.image}`}
                    alt={contact.name}
                    sx={{ width: 40, height: 40, mx: "auto" }}
                  />
                </Link>
              </td>
              <td style={tableCellStyle}>{contact.name}</td>
              <td style={tableCellStyle}>{contact.last_name}</td>
              <td style={tableCellStyle}>{contact.phone_no}</td>
              <td style={tableCellStyle}>{contact.email}</td>
              <td style={tableCellStyle}>{contact.company}</td>
              <td style={tableCellStyle}>{contact.job_title}</td>
              <td style={tableCellStyle}>
                <IconButton
                  onClick={(event) => handleMenuOpen(event, contact.id)}
                  sx={{ color: "primary.main" }}
                >
                  <MoreVertIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menu for Edit/Delete */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit()}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {handleDelete()}}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

// Styles for the table elements
const tableHeaderStyle = {
  textAlign: "center",
  padding: "10px",
  borderBottom: "2px solid #ccc",
  fontWeight: "bold",
  backgroundColor: "#f1f1f1",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  textAlign: "center",
  padding: "10px",
};

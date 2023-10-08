"use client"

import React, {useState} from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Box,
  TextField,
  BottomNavigationAction,
  BottomNavigation,
  Paper
} from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';
function Footer() {
    const [value, setValue] =useState<number>(1);
  return (
    
      <Paper
        sx={{ position: "fixed",height:"40px", bottom: 0, left: 0, right: 0, backgroundColor:"#0e0e11dd", color:"white", display:"flex", justifyContent:"center", alignItems:"center", }}
        elevation={3}
      >
        &copy; {new Date().getFullYear()} Copyright:{' '} mamaisonalouer.com
       {/*  <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{display:"flex", flexDirection:"row", justifyContent:"space-around", backgroundColor:"#363535"}}
        >
          
          <BottomNavigationAction label="CDIM ingenierie" color="primary" icon={<CopyrightIcon />}  />
          
        </BottomNavigation> */}
      </Paper>
    
  );
}

export default Footer;

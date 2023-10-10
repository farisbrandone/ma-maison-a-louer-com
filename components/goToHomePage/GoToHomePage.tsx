"use client"
import * as React from 'react'
import SnackComponent from '../SnackComponent'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

function GoToHomePage() {
    const router=useRouter()
  
  return (
     
     <Box sx={{display:"flex",flexDirection:"column", alignItems:"center", padding:"25px" ,width:"100vw", height:"100vh"}}>
     <SnackComponent/>
       <Typography variant='h5'  textAlign="center">
        Page de redirection....
       </Typography>
       <Typography variant='h5' textAlign="center">
       {" Cliquez ci-dessous pour vour rendre à l'acceuil"}
       </Typography>
       <Button variant="contained"  onClick={()=>{router.push("/")}} sx={{marginTop:"25px", padding:"10px", fontSize:"16px"}}>{"Allez à la page d'acceuil"}</Button>
     </Box>
    
  )
}

export default GoToHomePage

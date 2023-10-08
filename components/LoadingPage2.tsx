import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';


export default function LoadingPage2() {
  return (
    <Box sx={{ width:"100%", display:"flex", alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
     <CircularProgress disableShrink />;
    </Box>
  );
}
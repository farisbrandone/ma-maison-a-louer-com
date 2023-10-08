import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


const table=[1,2,3,4,5,6]

export default function LoadingPage() {
  return (
    <Box sx={{ width:"100%", display:"flex",flexDirection:"row",flexWrap:"wrap", justifyContent: "center"}}>
      {table.map((elt,index)=>(
        <Box key={elt} style={{width:"270px", display:"flex",flexDirection:"column",alignItems:"center",}} >
          <Skeleton variant="text" sx={{ fontSize: '1rem', width:"250px" }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={250} height={60} />
          <Skeleton variant="rounded" width={250} height={60} />
        </Box>
      ))}
      {/* <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} /> */}
    </Box>
  );
}
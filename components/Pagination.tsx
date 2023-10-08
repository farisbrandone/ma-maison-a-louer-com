"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function PaginationControlled(
  {indexFirst, setIndexFirst,indexLast, setIndexLast, totalCount, setTotalCount, page, setPage}:
  { indexFirst:number,
    setIndexFirst:React.Dispatch<React.SetStateAction<number>>,
    indexLast:number,
    setIndexLast:React.Dispatch<React.SetStateAction<number>>,
    totalCount:number,
    setTotalCount:React.Dispatch<React.SetStateAction<number>>,
    page:number,
    setPage:React.Dispatch<React.SetStateAction<number>>,
  }
) {
  const [pages, setPages]=React.useState(1)
  console.log(page)
  const numberPerPage=3
  const numberOfPage=totalCount%numberPerPage===0?totalCount/numberPerPage:(totalCount-(totalCount%numberPerPage))/numberPerPage+1
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
     setPage(value); 
   setPages(value)
    setIndexFirst((value-1)*numberPerPage)
    setIndexLast((value)*numberPerPage-1)
  };
  React.useEffect(() => {
    setPages(page)
  
  }, [page])

  return (
    <Box
      sx={{
        marginBottom: "80px",
        marginTop: "-35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "280px",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          backgroundColor: "#cdc9c9",
          padding: { xs: "2px", sm: "3px", md: "5px", lg: "5px" },
          borderRadius: "2px",
        }}
      >
        {/* <Typography>Page: {page}</Typography>  */}
        <Pagination
          count={numberOfPage}
          page={pages}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Box>
  );
}

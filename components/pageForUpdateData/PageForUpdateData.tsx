"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Button from  "@mui/material/Button"
 import AppBar from "@mui/material/AppBar"
 import Stack from  "@mui/material/Stack"
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import HouseIcon from "@mui/icons-material/House";
import DialogButton from "./DialogButton";
import { useRouter } from 'next/navigation'
import SnackComponent from "../SnackComponent";

interface Stock {
  typeDoffre: string;
  created_at: string;
  id:string;
}

type DataForUpdate =Stock[]
interface DataForUpdateProps {
  dataForUpdate: DataForUpdate;
}

interface Data {
  created_at: string;
  typeDoffre: string;
  id:string;
}

function createData(typeDoffre: string, created_at: string,id:string): Data {
  return {
    typeDoffre,
    created_at,
    id,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1; /* we suppose T type is Data => {modifieLe: number;carbs: number; fat: number;typeDoffreLocation: string;protein: number;}*/
  } /* we obtain orderBy: "typeDoffreLocation" | "modifieLe" | "fats" | "cards" | "protein" */
  if (b[orderBy] > a[orderBy]) {
    /* so if the value pass to orderBy="typeDoffreLocation" we have b["typeDoffreLocation"]>a["typeDoffreLocation"] */
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order /* supposons order="asc" */,
  orderBy: Key /* ici orderBy peut etre n'inporte quelle chaine de caractère clé de n'inporte qoi */
): (
  /* exemple key passe en paramètre = "typeDoffreLocation"| "modifieLe" | "fats" | "cards" | "protein" */
  a: {
    [key in Key]: number | string;
  } /* ici on aura a:{typeDoffreLocation: number|string, modifieLe:number | string etc...} */,
  b: {
    [key in Key]: number | string;
  } /* ce sont les types associer au parametre de la founction f(order, oderBy)(a,b) */ /* b:{etc...} */
) => number {
  
  return order === "desc" /* value false */
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) =>
        -descendingComparator(
          a,
          b,
          orderBy
        ); /* valeur retournée pour le cas ou orderBy="modifieLe"  et (a , b)=(createData('Cupcake', 305, 3.7, 67, 4.3), createData('Donut', 452, 25.0, 51, 4.9))*/
} /* on a donc a["modifieLe"]=305, b["modifieLe"]=452 d'ou  descendingComparator(a, b, orderBy)=1 => return -1*/

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  /* readonly veut dire on peut uniquement lire  */
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [T, number]
  ); /* supposons que T= keyof Data="typeDoffreLocation"| "modifieLe" | "fats" | "cards" | "protein" */
  // donc array est de type "typeDoffreLocation"| "modifieLe" | "fats" | "cards" | "protein"[]
  // supposons array = ["modifieLe", "fats"]
  // d'ou stabilizedThis= [["modifieLe", 0], ["fats", 1]]
  stabilizedThis.sort((a, b) => {
    // a=["modifieLe", 0] et b=["fats", 1]

    const order = comparator(a[0], b[0]); //comparator("modifieLe", "fats")
    
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1]; // si sup a 0 a sinon b
  });
 
  return stabilizedThis.map((el) => el[0]); // avec inf a 0 we return ["fats", "modifieLe"]
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "typeDoffre",
    numeric: false,
    disablePadding: true,
    label: "Type d'offre",
  },
  {
    id: "created_at",
    numeric: true,
    disablePadding: false,
    label: "Modifié le",
  },
 
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order; //type Order = 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
   
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {" "}
        {/* première ligne */}
        <TableCell padding="checkbox">
          {" "}
          {/* première cellule de la première ligne qui est un checkbox */}
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ pr: headCell.id === "created_at" ? 2 : 1 }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected:readonly string[]
}




function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const router = useRouter()
  const { numSelected } = props;
  const [controEffect, setControEffect]=React.useState(false);

const handleUpdate=()=>{
  setControEffect(true);
}

React.useEffect(() => {
 
  const body=[...props.selected]
  const data1=JSON.stringify(body)
  if (controEffect){
    const fetchData = async () => {
      const response = await fetch(`/api/updateForUpdate`, {
        method:"POST",
        body:data1
      });
    
    };
   
    fetchData();
    setControEffect(false)
  } 
}, [controEffect,props.selected])

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Donnée insérée
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          {numSelected <= 1 ? (
            <Tooltip title="Update">
            <IconButton  onClick={()=>router.push(`/updateForUpdatePage?id=${props.selected[0]}`)}>
              <SystemUpdateAltIcon />
            </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title="Delete">
            <IconButton>
              <DialogButton selected={props.selected}/>
              {/* <DeleteIcon /> */}
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function PageForUpdateData(props: DataForUpdateProps) {
  const dataForUpdate = props.dataForUpdate;

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("created_at");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const router = useRouter()
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    /* setOrderBy(property); */
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataForUpdate.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    typeDoffreLocation: string
  ) => {
    const selectedIndex = selected.indexOf(typeDoffreLocation);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, typeDoffreLocation);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
 
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (typeDoffreLocation: string) =>
    selected.indexOf(typeDoffreLocation) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataForUpdate.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(dataForUpdate, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dataForUpdate]
  );

  return (
    <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", minHeight:"100vh", marginBottom:{xs:"60px"}}} >
    
     <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff" }}
        component="nav"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0px",
              marginRight: "25px",
              marginLeft: "-22px",
            }}
          >
            <IconButton
              size="small"
              edge="start"
              aria-label="logo"
              color="primary"
            >
              <HouseIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
                fontSize: { xs: "14px", md: "16px", lg: "18px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              mamaisonalouer.com
            </Typography>
          </Box>
          <Stack direction="row" spacing={8}>
            <Stack direction="row" spacing={1}>
             
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "10px", sm: "10px", md: "11px", lg: "12px" },
                }}
                color="error"
                onClick={()=>router.push("/insertDataPage/pageForDataProprietaire")}
              >
                {"Quitter"}
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>






    <Box sx={{ width: "80%", mt:{xs:11, sm:15}}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 280 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataForUpdate.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id+index);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) =>
                      handleClick(event, row.id+index)
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                     <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {index+1}
                    </TableCell> 
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.typeDoffre}
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      {row.created_at}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataForUpdate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Affichage compacte"
      />
    </Box>
    </Box>
  );
}

'use client'
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
  FormControl,
  InputLabel,
  Select,
  Divider,
  Avatar,
} from "@mui/material";
import React, { useReducer, useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SelectChangeEvent } from "@mui/material/Select";
 import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import data from "../../data/data"; 
import { Theme, useTheme } from "@mui/material/styles";
import { dataRows } from "../body/BodyComponent";
import image from "../../public/brandi-redd-aJTiW00qqtI-unsplash.jpg"
import { createTheme, ThemeProvider } from '@mui/material/styles';
const initialState = {
  anchorChambre: null,
  anchorAppart: null,
  anchorStudio: null,
  anchorVilla: null,
  anchorAutre: null,
};
type anchorState<E extends null | HTMLElement> = {
  anchorChambre: E;
  anchorAppart: E;
  anchorStudio: E;
  anchorVilla: E;
  anchorAutre: E;
};

type anchorActionProps = {
  type: string;
  payload: HTMLButtonElement;
  /* payload:React.MouseEvent<HTMLButtonElement> */
};
type resetAction = {
  type: "RESET";
};
type anchorAction = anchorActionProps | resetAction;


function reducer<E extends null | HTMLElement>(
  state: anchorState<E>,
  action: anchorAction
) {
  switch (action.type) {
    case "CHAMBRE":
    
      return {
        anchorChambre: action.payload,
        anchorAppart: null,
        anchorStudio: null,
        anchorVilla: null,
        anchorAutre: null,
      };
    case "STUDIO":
      return {
        anchorChambre: null,
        anchorAppart: null,
        anchorStudio: action.payload,
        anchorVilla: null,
        anchorAutre: null,
      };
    case "APPART":
      return {
        anchorChambre: null,
        anchorAppart: action.payload,
        anchorStudio: null,
        anchorVilla: null,
        anchorAutre: null,
      };
    case "VILLA":
      return {
        anchorChambre: null,
        anchorAppart: null,
        anchorStudio: null,
        anchorVilla: action.payload,
        anchorAutre: null,
      };
    case "AUTRE":
      return {
        anchorChambre: null,
        anchorAppart: null,
        anchorStudio: null,
        anchorVilla: null,
        anchorAutre: action.payload,
      };

    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 155,
    },
  },
};
function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const themes = createTheme({
  palette: {
    ochre: {
      main: '#333333',
      light: '#535252',
      dark: '#393939',
      contrastText: '#ffffff',
    },
  },
});

const isBrowser = () => typeof window !== 'undefined';

function Header({ session,setDataDisplay,setRefresh, citys,payss,setCitys, setPayss}: 
  { session: Session | null,
    setDataDisplay:React.Dispatch<React.SetStateAction<dataRows>>,
    setRefresh:React.Dispatch<React.SetStateAction<boolean>>,
    citys:string ,
    payss:string,
    setCitys:React.Dispatch<React.SetStateAction<string>>,
    setPayss:React.Dispatch<React.SetStateAction<string>>,
    
  }) {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();
  const citysvalue=citys!==""?citys:""
  const paysvalue=payss!==""?payss:""
  const [pays, setPays] = React.useState(citysvalue);
  const [city, setCity] = React.useState(paysvalue); 
  const [display, setDisplay]=React.useState("flex")
  const user = session?.user
   const router=useRouter() 
   
  const handleChangeCountry = (event: SelectChangeEvent) => {
    setPays(event.target.value);
  };

  

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    valueHandle: string
  ) => {
    dispatch({ type: valueHandle, payload: event.currentTarget });
    /* setAnchor(event.currentTarget); */
  };
  /* console.log(state.anchorChambre) */
  const openChambre = Boolean(state.anchorChambre);
  const openAppart = Boolean(state.anchorAppart);
  const openStudio = Boolean(state.anchorStudio);
  const openVilla = Boolean(state.anchorVilla);
  const openAutre = Boolean(state.anchorAutre);
  const handleClose1 = () => {
    dispatch({ type: "RESET" });
  };
  const handleClose = (value:string) => {
   /*  dispatch({ type: "RESET" }); */
    
    if(city!=="" && pays!==""){
      /* setRefresh(prevState=>!prevState) */
      router.push(`/api/searchCountryCity?localisationVille=${city}&localisationPays=${pays}&typeDoffre=${value}`)
    }
    else{
      router.push(`/api/searchCountryCity?typeDoffre=${value}`)
      /* setRefresh(prevState=>!prevState)
      router.push(`/pageSearch?typeDoffre=${value}`) */
    }
    dispatch({ type: "RESET" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value as string);
  };
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountries(typeof value === "string" ? value.split(",") : value);
  };

 const handleSearchCountryCity= async ()=>{
     if (city==="" || pays===""){
      alert("Vous devez entrez les deux paramètres pays et ville")
     }
     else{
     /*  const  data1=JSON.stringify({city:city, pays:pays})
        const response = await fetch(`/api/searchCountryCity`, {
          method:"POST",
          body:data1
        }); */
       /*  setRefresh(prevState=>!prevState) */
        router.push(`/api/searchCountryCity?localisationVille=${city}&localisationPays=${pays}`)
      /*  fetch(`/api/searchCountryCity?localisationVille=${city}&localisationPays=${pays}`) */
     }
 }
 if (isBrowser()) {

   window.addEventListener('scroll', function(e) {
    const lastPosition = window.scrollY
    if (lastPosition > 50 ) {
     setDisplay("none")
    }  else {
     setDisplay("flex")
    }
  })
 }

 React.useEffect(() => {
     if (citys!=="" && payss!==""){
      setCity(citys);
      setPays(payss)
     }
 }, [])



  return (
    <ThemeProvider theme={themes}>
    <AppBar
      position="fixed"
      sx={{   backgroundColor: "#ffffff",   backgroundImage:`url(${image.src})`, backgroundRepeat: "no-repeat", backgroundSize:`cover`, backgroundPosition: "center",}}
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
            style={{ marginLeft:"10px"}}
          >
           <Avatar sx={{backgroundColor:"#333333"}} aria-label="recipe">
             <HouseIcon />
          </Avatar>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              fontSize: { xs: "14px", md: "16px", lg: "18px" },
              width:{ /* xs: "50px", */ md:"100%",xs: "0px", },
              overflow:{ xs: "visible"},
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             /*  paddingLeft:{ xs: "62px", md: "0px",}, */
              userSelect:"none"
            }}
          >
           
          </Typography>
        </Box>

        <Stack direction="row" spacing={8}>
          <Stack direction="row" spacing={1}>
            {user?(<Typography variant="subtitle2" color="primary" sx={{width: { xs: "10px", sm: "100px" }, overflow:"hidden", display:{xs:"none", sm:"flex", height:"100%"}, alignItems:"center", paddingRight:"10px"}}>{user.email}</Typography>):null}
            <Button
              variant="text"
              sx={{
                backgroundColor: "#ffffff",
                color: "#333333",
                fontSize: { xs: "9px", sm: "11px", md: "12px", lg: "13px" },
                border: "1px solid #333333",
                fontWeight:600
              }}
              onClick={()=>{
                 router.push("/authentification_proprietaire") 
                
                }
                }
            >
             🔥 Poster des annonces
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "#f8f5f5",
                fontSize: { xs: "8px", sm: "10px", md: "11px", lg: "12px" },
                fontWeight:600
              }}
               onClick={()=>{
               
               /*  router.push("/authentification_user") */}} 
            >
              <Link href="/authentification_user"  style={{textDecoration:"none", color:"white"}}>
              {"get new post"}
              </Link>
            </Button>
           {/*  <Button
              variant="contained"
              sx={{
                backgroundColor: "#d25719",
                color: "#f8f5f5",
                fontSize: { xs: "8px", sm: "10px", md: "11px", lg: "12px" },
              }}
               
            >
              <form method="post" action="/auth/signout"  style={{textDecoration:"none", color:"white"}}>
              <Button type="submit" sx={{color:"white"}} >Logout</Button>
              </form>
              
            </Button> */}
          </Stack>
        </Stack>
      </Toolbar>
      {/* part of select country and city */}

      <Toolbar
        sx={{
          display: display,
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap", lg: "nowrap" },
          gap: "10px",
        }}
      >
        {/* ...................................................... */}
        <Stack
          direction="row"
          spacing={{ xs: 1, md: 2, lg: 3 }}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: "0px",
          }}
        >
          
          <div>
            <Button
              id="chambre-button"
              variant="contained"
              color="ochre"
              onClick={(event) => handleClick(event, "CHAMBRE")}
              aria-controls={openChambre ? "chambre-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openChambre ? true : undefined}
              endIcon={<KeyboardArrowDownIcon style={{ marginLeft: "-5px" }} />}
              sx={{
                fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                width: { xs: "60px", sm: "80px", md: "90px", lg: "100px" },
               
              }}
            >
              Chambre
            </Button>
            <Menu
              id="chambre-menu"
              anchorEl={state.anchorChambre}
              open={openChambre}
              MenuListProps={{
                "aria-labelledby": "chambre-button",
              }}
              onClose={handleClose1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={()=>handleClose("Chambre simple")}>Simple</MenuItem>
              <MenuItem onClick={()=>handleClose("Chambre moderne non meublée")}>Moderne non meublée</MenuItem>
              <MenuItem onClick={()=>handleClose("Chambre moderne meublée")}>Moderne meublée</MenuItem>
              <MenuItem onClick={()=>handleClose("Chambre D'hôtel")}>{"D'hôtel"}</MenuItem>
            </Menu>
          </div>
             
          <div>
            <Button
              variant="contained"
              color="ochre"
              id="appartement-button"
              onClick={(event) => handleClick(event, "APPART")}
              aria-controls={openAppart ? "appartement-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openAppart ? true : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                width: { xs: "60px", sm: "80px", md: "90px", lg: "100px" },
               
              }}
            >
              Appart
            </Button>
            <Menu
              id="appartement-menu"
              anchorEl={state.anchorAppart}
              open={openAppart}
              MenuListProps={{
                "aria-labelledby": "appartement-button",
              }}
              onClose={handleClose1}
              onClick={handleClose1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={()=>handleClose("Appartement non meublée")}>Moderne non meublée</MenuItem>
              <MenuItem onClick={()=>handleClose("Appartement meublée")}>Moderne meublée</MenuItem>
            </Menu>
          </div>

          <div>
            <Button
              variant="contained"
              color="ochre"
              id="studio-button"
              onClick={(event) => handleClick(event, "STUDIO")}
              aria-controls={openStudio ? "studio-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openStudio ? true : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                width: { xs: "60px", sm: "80px", md: "90px", lg: "100px" },
               
              }}
            >
              Studio
            </Button>
            <Menu
              id="studio-menu"
              anchorEl={state.anchorStudio}
              open={openStudio}
              MenuListProps={{
                "aria-labelledby": "studio-button",
              }}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={()=>handleClose("Studio simple")}>Simple</MenuItem>
              <MenuItem onClick={()=>handleClose("Studio moderne non meublée")}>Moderne non meublée</MenuItem>
              <MenuItem onClick={()=>handleClose("Studio moderne meublée")}>Moderne meublée</MenuItem>
            </Menu>
          </div>

          <div>
            <Button
              variant="contained"
              color="ochre"
              id="villa-button"
              onClick={(event) => handleClick(event, "VILLA")}
              aria-controls={openAppart ? "villa-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openAppart ? true : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                width: { xs: "60px", sm: "80px", md: "90px", lg: "100px" },
                
              }}
            >
              Villa
            </Button>
            <Menu
              id="villa-menu"
              anchorEl={state.anchorVilla}
              open={openVilla}
              MenuListProps={{
                "aria-labelledby": "villa-button",
              }}
              onClose={handleClose1}
              onClick={handleClose1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={()=>handleClose("Maison familiale")}>Maison familiale</MenuItem>
              <MenuItem onClick={()=>handleClose("Villa")}>Villa</MenuItem>
            </Menu>
          </div>

          <div>
            <Button
               variant="contained"
               color="ochre"
              id="autre-button"
              onClick={(event) => handleClick(event, "AUTRE")}
              aria-controls={openAutre ? "autre-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openAutre ? true : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                width: { xs: "60px", sm: "80px", md: "90px", lg: "100px" },
               
              }}
            >
              Autre
            </Button>
            <Menu
              id="autre-menu"
              anchorEl={state.anchorAutre}
              open={openAutre}
              MenuListProps={{
                "aria-labelledby": "autre-button",
              }}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={()=>handleClose("Bureaux")}>Bureaux</MenuItem>
              <MenuItem onClick={()=>handleClose("Boutique")}>Boutique</MenuItem>
              <MenuItem onClick={()=>handleClose("Immeuble")}>Immeuble</MenuItem>
              <MenuItem onClick={()=>handleClose("Entrepôt")}>Entrepôt</MenuItem>
              <MenuItem onClick={()=>handleClose("Sale de fête")}>Sale de fête</MenuItem>
              <MenuItem onClick={()=>handleClose("Terrain")}>Terrain</MenuItem>
              <MenuItem onClick={()=>handleClose("Chambre d'hôtel")}>{"Chambre d'hôtel"}</MenuItem>
            </Menu>
          </div>
        </Stack>

        <Box
          width="500px"
          display="flex"
          gap={0}
          flexDirection="row"
          sx={{ alignItems: "center", justifyContent: "center", marginBottom:"10px" }}
        >
          <FormControl sx={{ minWidth: 120, }} size="small">
            <InputLabel id="select-country" sx={{fontSize:{xs:"12px", sm:"14px", md: "15px",}}}>Select pays</InputLabel>
            <Select
            
              color="primary"
              labelId="select-country"
              id="demo-select-country"
              value={pays}
              label="Select pays"
              onChange={handleChangeCountry}
              MenuProps={MenuProps}
              style={{backgroundColor:"#ffffff"}}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Bénin">Bénin</MenuItem>
              <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
              <MenuItem value="Cameroun">Cameroun</MenuItem>
              <MenuItem value="Centrafrique">Centrafrique</MenuItem>
              <MenuItem value="Congo Brazaville">Congo Brazaville</MenuItem>
              <MenuItem value="Cote d'ivoire">{"Cote d'ivoire"}</MenuItem>
              <MenuItem value="Gabon">Gabon</MenuItem>
              <MenuItem value="Guinée équatoriale">Guinée équatoriale</MenuItem>
              <MenuItem value="Guinée Conakry">Guinée Conakry</MenuItem>
              <MenuItem value="Mali">Mali</MenuItem>
              <MenuItem value="Niger">Niger</MenuItem>
              <MenuItem value="Sénégal">Sénégal</MenuItem>
              <MenuItem value="Togo">Togo</MenuItem>
            </Select>
          </FormControl>
         {/*  <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="select-city" sx={{fontSize:{xs:"12px", sm:"14px", md: "15px",}}} >Select city</InputLabel>
            <Select
              labelId="select-city"
              id="demo-select-city"
              value={city}
              label="Select city"
              onChange={handleChangeCity}
              MenuProps={MenuProps}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Cameroun">Cameroun</MenuItem>
            </Select>
          </FormControl> */}





    
    {/* ...............choice of city..................... */}
    <FormControl sx={{ minWidth: 120, }} size="small">
                        <InputLabel id="select-city"  sx={{fontSize:{xs:"12px", sm:"14px", md: "15px",}}}>
                          {"Select Ville"}
                        </InputLabel>
                        <Select
                        style={{backgroundColor:"#ffffff"}}
                          labelId="select-city"
                          id="select-city"
                          name="select-city"
                          value={city}
                          MenuProps={MenuProps}
                          onChange={handleChangeCity}
                          disabled={pays===""?true:false}
                        >
                       {pays==='Bénin'?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null} 
                          {pays==="Burkina Faso"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null} 
                           {pays=== "Cameroun"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null} 
                          {pays==="Centrafrique"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null} 
                           {pays==="Congo Brazaville"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null} 
                          {pays==="Côte D'ivoire"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null} 
                          {pays==="Gabon"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                          {pays==="Guinée"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                          {pays==="Guinée équatoriale"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                          {pays==="Mali"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                           {pays==="Niger"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                           {pays==="RDC"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                          {pays==="Sénégal"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                           {pays==="Tchad"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                          {pays==="Togo"?(data[pays].map((name)=> (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(theme)}
                            >
                              {name}
                            </MenuItem>
                          ))):null}
                        </Select>
                      </FormControl>


 {/* ......................choice of city.................... */}






          <IconButton
            size="large"
            edge="start"
            aria-label="logo"
            color="primary"
            sx={{
              border: "1px solid #7777",
              borderRadius: "2px",
              marginLeft: "0px",
              height: "40px",
             backgroundColor:"#ffffff"
             /*  desabled:`${city==="" || pays===""}`, */
             
            }}
          onClick={handleSearchCountryCity}
        
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Box>

        {/* ................................................. */}
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header;

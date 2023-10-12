"use client"
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Database } from "@/types/database";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { dataRows } from "../body/BodyComponent";
import LoadingPage from "../LoadingPage";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import HouseIcon from "@mui/icons-material/House";
import LoadingPage2 from "../LoadingPage2";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { grey as greys } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const CDNURL =
  "https://tkvtphatpjsobxkwbqmd.supabase.co/storage/v1/object/public/catalogue_images";

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OneImagePage() {
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [dataDisplay, setDataDisplay] = React.useState<dataRows>([]);
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();
  const id = searchParams.get("value");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const convertDate = (param: string | null) => {
    if (param) {
      const date = new Date(param);
      const dateString = date.toDateString();
      return dateString;
    }
  };
  const getProfile = React.useCallback(async () => {
    try {
      setLoading(true);
      if (id) {
        let { data, count, error, status } = await supabase
          .from("tableDesOffres")
          .select("*", { count: "exact" })
          .eq("id", id);

        if (error && status !== 406) {
          throw error;
        }
        if (data && count) {
          setDataDisplay(data);
        }
      }
    } catch (error) {
     console.log(error)
      alert("Erreur de chargement de donnée pour la mise à jour"); 
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    /*  router.reload(); */
    getProfile();
  }, [getProfile, searchParams]);

  if (loading) {
    return (
      <>
        <LoadingPage2 />
      </>
    );
  }
  if (!loading && (dataDisplay.length === 0)){
    return (
    <Box
    sx={{
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <Typography
      variant="h5"
      component="h2"
      color="primary"
      textAlign="center"
    >
      Opps!!!
    </Typography>
    <Typography
      variant="h5"
      component="h2"
      color="primary"
      textAlign="center"
    >
      Vérifier votre connextion et réessayez SVP...
    </Typography>
  </Box>
      )
  }

  return (
    <Card sx={{ minWidth: 280, minHeight:"100vh", marginBottom:"40px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor:"#0b0bb654" }} aria-label="recipe">
             <HouseIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={dataDisplay[0].typeDoffre + ` À ${dataDisplay[0].typeOffert}`}
        subheader={convertDate(dataDisplay[0].created_at)}
      />
      <Carousel
        NextIcon={<ArrowForwardIosIcon/>}
        PrevIcon={<ArrowBackIosIcon />}
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        swipe={true}
        animation="slide"
        duration={500}
      >
        {
            dataDisplay[0].imageFile?.map((item, i)=>(
                <React.Fragment key={i}>
                    <Image
                    src={`${CDNURL}/${item}`}
                    alt={item}
                    loading="lazy"
                    width={200}
                    height={200}
                    style={{ width:"100%", height:"100%",}}
                  />
                </React.Fragment>
            ))
        }
      </Carousel>
     {/*  <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", color:"#333333", backgroundColor:"#ffffff"}}>
      <Typography variant="body1" style={{backgroundColor:"#efeaea"}}>
        {`${dataDisplay[0].nbreDeChambre!=="null"?dataDisplay[0].nbreDeChambre+"Ch |":""}
         ${dataDisplay[0].nbreDeSalon!=="null"?dataDisplay[0].nbreDeSalon+ "Salon |":""}
         ${dataDisplay[0].nbreDeCuisine!=="null"?dataDisplay[0].nbreDeCuisine + "Cuis |":""}
             ${dataDisplay[0].nbreDeDouche!=="null"?dataDisplay[0].nbreDeDouche + "Dch":""}
            
             `}    
        </Typography>
        <Typography variant="body1" >
        {`${dataDisplay[0].largeurTerrain!=="null"?"Largeur espace :"+ " " +dataDisplay[0].largeurTerrain+" m |":""}
         ${dataDisplay[0].longueurTerrain!=="null"?"Longueur espace :"+ " "+dataDisplay[0].longueurTerrain+ " m":""}
             `}    
        </Typography>
        
        <Typography variant="body1" >
          <LocationOnIcon  sx={{color:greys[800]}}  />
        {`${dataDisplay[0].localisationQuartier!=="null"? dataDisplay[0].localisationQuartier+"-":""}
             ${dataDisplay[0].localisationVille!=="null"?dataDisplay[0].localisationVille+ "-":""}
             ${dataDisplay[0].localisationPays!=="null"?dataDisplay[0].localisationPays:""}
             `}    
        </Typography>

        <Typography variant="body1" >
        {`${dataDisplay[0].priceSale!=="null"?"Prix de vente :"+ dataDisplay[0].priceSale+` ${dataDisplay[0].devise}`:""}
         ${dataDisplay[0].montantMensuel!=="null"?"Montant mensuel :"+dataDisplay[0].montantMensuel+ ` ${dataDisplay[0].devise}`:""}
             `}    
        </Typography>
        <Typography variant="body1" >
        {`${dataDisplay[0].email!=="null"?"Email: "+ dataDisplay[0].email:""}
             `}    
        </Typography>
        <Typography variant="body1" >
        {`${dataDisplay[0].telephoneNumber!=="null"?"Tel: "+ dataDisplay[0].telephoneNumber:""}
             `}    
        </Typography>
        <Typography variant="body1">
            {`${dataDisplay[0].montantMensuel!=="null"?"📌 Montant mensuel :"+ dataDisplay[0].montantMensuel+` `+dataDisplay[0].devise+ " "+"/mois" :""}
             `}  
          </Typography>
        <Typography variant="body1">
            {`${dataDisplay[0].firstPayment!=="null"?"📌 Fournir pour le premier payment :"+ dataDisplay[0].firstPayment+` mois`:""}
             `}  
          </Typography>
          <Typography variant="body1">
            {`${dataDisplay[0].caution!=="null"?"📌 Caution :"+ dataDisplay[0].caution+` mois`:""}
             `}  
          </Typography>
          <Typography variant="body1">
            {`${dataDisplay[0].priceSale!=="null"?"📌 Prix de vente :"+ dataDisplay[0].priceSale+` `+ dataDisplay[0].devise:""}
             `}  
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{backgroundColor:"##616161", color:"#333333"}}>
       
          <Typography paragraph>
            {`${dataDisplay[0].parking!=="null"?"📌 Présence d'un parking":""}
             `}  
          </Typography>
          <Typography paragraph>
            {`${dataDisplay[0].niveauAppart!=="null"?"📌 Bien situé au "+ ` ${dataDisplay[0].niveauAppart}ième niveau`:""}
             `}  
          </Typography>
          <Typography paragraph>
          {`${dataDisplay[0].balcon!=="null"?"📌 Balcon disponible pour vos détentes":""}
             `}  
          </Typography>

          <Typography paragraph>
            {`${dataDisplay[0].description!=="null"?"📌 Autres caractéristique :"+ dataDisplay[0].description:""}
             `}  
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}

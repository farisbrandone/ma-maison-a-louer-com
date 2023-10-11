"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
/* import { useNavigate } from "react-router-dom"; */
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import * as Yup from "yup";
/* import Resizer from "react-image-file-resizer"; */
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
  Grid,
  FormLabel,
  FormHelperText,
  Input,
  InputAdornment,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Avatar,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import { Theme, useTheme } from "@mui/material/styles";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import data from "../../data/data";
import { currencies } from "./InsertDataLocat";
import { allData } from "@/types/allData";
import { Database } from "@/types/database";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import image from "../../public/brandi-redd-aJTiW00qqtI-unsplash.jpg"
import Compressor from "compressorjs";
import CircularWithValueLabel from "../ProgressBar";
type ImageType = {
  /*  image: Blob; */
  fileName: string;
};
type ImageTypeWithNull = string[];

interface typeInitialValue {
  nbreDeChambre: string;
  nbreDeCuisine: string;
  nbreDeSalon: string;
  nbreDeDouche: string;
  parking: string;
  balcon: string;
  niveauAppart: string;
  longueurTerrain: string;
  largeurTerrain: string;
  typeDoffre: string;
  typeOffert: string;
  localisationPays: string;
  localisationVille: string;
  localisationQuartier: string;
  description: string;
  imageFile: ImageTypeWithNull;
  montantMensuel: string;
  firstPayment: string;
  caution: string;
  priceSale: string;
  telephoneNumber: string;
  devise: string;
}
type initialValueAndNull = typeInitialValue | null;
let initialValues: typeInitialValue = {
  nbreDeChambre: "",
  nbreDeCuisine: "",
  nbreDeSalon: "",
  nbreDeDouche: "",
  parking: "",
  balcon: "",
  niveauAppart: "",
  longueurTerrain: "",
  largeurTerrain: "",
  montantMensuel: "",
  firstPayment: "",
  caution: "",
  priceSale: "",
  telephoneNumber: "",
  typeDoffre: "",
  typeOffert: "",
  localisationPays: "",
  localisationVille: "",
  localisationQuartier: "",
  description: "",
  imageFile: [],
  devise: "fcfa",
};
type dataAll = allData;
/* const dataAny:dataAll=data */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* const resizeFile = (file: File): Promise<Blob> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  }); */

const validationSchema = Yup.object({
  typeDoffre: Yup.string().required("Required"),
  typeOffert: Yup.string().required("Required"),
  localisationPays: Yup.string().required("required"),
  localisationVille: Yup.string().required("required"),
  telephoneNumber: Yup.string().required("required"),
  description: Yup.string().required("required"),
  imageFile: Yup.array().required("required"),
});

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

const CDNURL =
  "https://tkvtphatpjsobxkwbqmd.supabase.co/storage/v1/object/public/catalogue_images";


  const compressImage = async (file:File, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(imageBitmap, 0, 0, 380,350);

    // Turn into Blob
    const blob:Blob = await new Promise((resolve) =>
    canvas.toBlob((blob)=>{if (blob) resolve(blob)}, type, quality)
);

// Turn Blob into File
return new File([blob], file.name, {
    type: blob.type,
});
};



function InsertDataProprietaire({ session }: { session: Session | null }) {
  const [formValues, setFormValues] = useState<initialValueAndNull>(
    initialValues
  );
  
  const router = useRouter();
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const onSubmit = (
    values: typeInitialValue,
    onSubmitProps: FormikHelpers<typeInitialValue>
  ) => {
    const data = { ...values, ...{ imageFile: myImage } };
   
    /*  navigate.push(`/insertData/dataPropietaire?imageFile=${myImage}`, ) */
    onSubmitProps.setSubmitting(false);
    /*  onSubmitProps.resetForm(); */
    /*  setMyImage([]); */
  };

  const formik = useFormik({
    //useformik return an object
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const supabase = createClientComponentClient<Database>();
  const theme = useTheme();

  const [myImage, setMyImage] = useState<any[]>([]);
  /* const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url) */
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const user = session?.user;
  const uid = user?.id;

  /* const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const tableImage: ImageTypeWithNull = [];
    try {
      console.log("image is");
      const files = event.target.files;
      console.log(files);
      const file = event.currentTarget.files[0];

      let i = 0;

      for (const [key, value] of Object?.entries(files)) {
        const fileName = value?.name; 
        const image: Blob = await resizeFile(value);
        tableImage.push({ image: image, fileName });
        console.log("the tableImage is", tableImage);

        i++;
      }

      setMyImage((prevState) => [...prevState, ...tableImage]);
      
    } catch (err) {
      console.log(err);
    }
  };
 */
  const deleteImage = async (elt: string) => {
    const { error } = await supabase.storage
      .from("catalogue_images")
      .remove([elt]);

    if (error) {
      alert("Une erreur est survenue pendant la suppression");
    } else {
      /* getImage() */
      let imageTable = [...myImage];
      let index = imageTable.indexOf({ path: elt });
      imageTable.splice(index, 1);
      setMyImage(imageTable);
    }
  };

  const getImage = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from("catalogue_images")
      .list(uid + "/", {
        limit: 5,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {
    
      setMyImage(data);
    } else {
      alert("Le chargement d'images à échouer, réessayez Svp");
      console.log(error);
    }
  }, [uid]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    let tableImage: any[] = [];

    try {
      setUploading(true);
     
      if (
        !event.target.files ||
        event.target.files.length === 0 ||
        event.target.files.length > 5
      ) {
        throw new Error("You must select an image to upload.");
      }

      for (let i = 0; i < event.target.files.length; i++) {
        let foofou:File | Blob=event.target.files[i]
        const fileLength=event.target.files.length
        const file = event.target.files[i];
        const fileExt = file.name.split(".").pop();
       
        const filePath = `${uid}/${
          self.crypto.randomUUID() /* Math.random() */
        }.${fileExt}`;
       
        
        
        const compressedFile = await compressImage(file, {
          quality: 0.6,
          type: 'image/jpeg',
      });
        
       
         let { data, error: uploadError } = await supabase.storage
          .from("catalogue_images")
          .upload(filePath, compressedFile);
        if (data) {
        
         
          tableImage.push(data.path);
        } else {
          alert(
            "une urreur est survenue pendant le chargement d'image, réessayez Svp"
          );
          throw uploadError;
        } 
      }

     
      /* formik.values.imageFile=tableImage */
      setMyImage((prevState) => [...prevState, ...tableImage]);
      formik.setFieldValue('imageFile', [...formik.values.imageFile,...tableImage])
      initialValues = { ...initialValues, imageFile: [...tableImage] };
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
     
      setUploading(false);
    }
  };

  useEffect(
     () => {
      /* formik.setFieldValue('imageFile', [...formik.values.imageFile,...myImage]) */
    },
    [
      /*  myImage */ 
    ] 
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff", backgroundImage:`url(${image.src})`, backgroundRepeat: "no-repeat", backgroundSize:`cover`, backgroundPosition: "center", }}
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
            
          </Box>
          <Stack direction="row" spacing={8}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                sx={{
                  fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
                  border: "1px solid #1b0505",
                  fontWeight: "bold",
                  backgroundColor:"#ffffff"
                }}
                color="primary"
                onClick={() => {
                  router.push("/pageForUpdateData");
                }}
              >
                Update post
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
                }}
                color="error"
                onClick={() => router.push("/")}
              >
                {"Quitter"}
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          margin: "auto",
          marginTop: "60px",
          marginBottom: "60px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography variant="h6">
              Nous vous souhaitons la bienvenue
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              color="primary"
            >
              Remplissez les champs ci-dessous
            </Typography>
            {searchParams ? (
              <Typography variant="subtitle1" color="error">
                {searchParams.get("error")}
              </Typography>
            ) : null}
          </Stack>
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          method="post"
          action="/insertData/dataProprietaire"
        >
          <Box
            sx={{
              flexGrow: 1,
              width: { xs: "90vw", sm: "70vw", md: "60vw", lg: "50vw" },
            }}
          >
            <Grid container spacing={1}>
              {/* part choisir le type d'offre */}
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel id="typeDoffre">
                  {" Choisir le type d'offre :"}
                </FormLabel>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="typeDoffre">
                    {" Choisir le type d'offre"}
                  </InputLabel>
                  <Select
                    labelId="typeDoffre"
                    id="typeDoffre"
                    name="typeDoffre"
                    value={formik.values.typeDoffre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.typeDoffre &&
                      Boolean(formik.errors.typeDoffre)
                    }
                    MenuProps={MenuProps}
                  >
                    {data.listOfSelect.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* part choisir le type d'offre */}
              {/* nombre de chambre */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Bureaux" &&
              formik.values.typeDoffre !== "Boutique" &&
              formik.values.typeDoffre !== "Magasin" &&
              formik.values.typeDoffre !== "Entrepôt" &&
              formik.values.typeDoffre !== "Salle de fête" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="nbreDeChambre">
                      {" Entrer le nombre de chambre :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="nbreDeChambre">
                        {" Nombre de chambre"}
                      </InputLabel>
                      <Select
                        labelId="nbreDeChambre"
                        id="nbreDeChambre"
                        name="nbreDeChambre"
                        value={formik.values.nbreDeChambre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.nbreDeChambre &&
                          Boolean(formik.errors.nbreDeChambre)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.nbreDeChambre.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}
              {/* nombre de chambre */}

              {/* nombre de douche */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Bureaux" &&
              formik.values.typeDoffre !== "Boutique" &&
              formik.values.typeDoffre !== "Magasin" &&
              formik.values.typeDoffre !== "Entrepôt" &&
              formik.values.typeDoffre !== "Salle de fête" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="nbreDeDouche">
                      {" Entrer le nombre de douche :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="nbreDeDouche">
                        {" Nombre de douche"}
                      </InputLabel>
                      <Select
                        labelId="nbreDeDouche"
                        id="nbreDeDouche"
                        name="nbreDeDouche"
                        value={formik.values.nbreDeDouche}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.nbreDeDouche &&
                          Boolean(formik.errors.nbreDeDouche)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.nbreDeDouche.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}

              {/* nombre de douche */}

              {/* nombre de cuisine */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Chambre simple" &&
              formik.values.typeDoffre !== "Bureaux" &&
              formik.values.typeDoffre !== "Boutique" &&
              formik.values.typeDoffre !== "Magasin" &&
              formik.values.typeDoffre !== "Entrepôt" &&
              formik.values.typeDoffre !== "Salle de fête" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="nbreDeCuisine">
                      {" Entrer le nombre de cuisine :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="nbreDeCuisine">
                        {" Nombre de cuisine"}
                      </InputLabel>
                      <Select
                        labelId="nbreDeCuisine"
                        id="nbreDeCuisine"
                        name="nbreDeCuisine"
                        value={formik.values.nbreDeCuisine}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.nbreDeCuisine &&
                          Boolean(formik.errors.nbreDeCuisine)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.nbreDeCuisine.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>{" "}
                </>
              ) : null}

              {/* nombre de cuisine */}

              {/* nombre de salon */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Chambre simple" &&
              formik.values.typeDoffre !== "Chambre moderne non meublée" &&
              formik.values.typeDoffre !== "Chambre moderne meublée" &&
              formik.values.typeDoffre !== "Bureaux" &&
              formik.values.typeDoffre !== "Boutique" &&
              formik.values.typeDoffre !== "Magasin" &&
              formik.values.typeDoffre !== "Entrepôt" &&
              formik.values.typeDoffre !== "Salle de fête" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="nbreDeSalon">
                      {" Entrer le nombre de salon :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="nbreDeSalon">
                        {" Nombre de salon"}
                      </InputLabel>
                      <Select
                        labelId="nbreDeSalon"
                        id="nbreDeSalon"
                        name="nbreDeSalon"
                        value={formik.values.nbreDeSalon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.nbreDeSalon &&
                          Boolean(formik.errors.nbreDeSalon)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.nbreDeSalon.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}

              {/* nombre de salon */}

              {/* Presence de parking */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Chambre simple" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="parking">
                      {"  Présence de parking ? :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="parking">{"  Parking"}</InputLabel>
                      <Select
                        labelId="parking"
                        id="parking"
                        name="parking"
                        value={formik.values.parking}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.parking &&
                          Boolean(formik.errors.parking)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.parking.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}

              {/* Presence de parking */}

              {/* Presence de balcon */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Chambre simple" &&
              formik.values.typeDoffre !== "Bureaux" &&
              formik.values.typeDoffre !== "Boutique" &&
              formik.values.typeDoffre !== "Magasin" &&
              formik.values.typeDoffre !== "Entrepôt" &&
              formik.values.typeDoffre !== "Salle de fête" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="balcon">
                      {"  Présence de balcon ? :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="balcon">{" Balcon"}</InputLabel>
                      <Select
                        labelId="balcon"
                        id="balcon"
                        name="balcon"
                        value={formik.values.balcon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.balcon && Boolean(formik.errors.balcon)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.balcon.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}

              {/* Presence de balcon */}

              {/* A quelle étage ? */}

              {formik.values.typeDoffre !== "" &&
              formik.values.typeDoffre !== "Chambre simple" &&
              formik.values.typeDoffre !== "Bureaux" &&
              formik.values.typeDoffre !== "Boutique" &&
              formik.values.typeDoffre !== "Magasin" &&
              formik.values.typeDoffre !== "Entrepôt" &&
              formik.values.typeDoffre !== "Salle de fête" &&
              formik.values.typeDoffre !== "Terrain" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="niveauAppart">
                      {" A quelle étage ? :"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="niveauAppart">{" Étage"}</InputLabel>
                      <Select
                        labelId="niveauAppart"
                        id="niveauAppart"
                        name="niveauAppart"
                        value={formik.values.niveauAppart}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.niveauAppart &&
                          Boolean(formik.errors.niveauAppart)
                        }
                        MenuProps={MenuProps}
                      >
                        {data.niveauAppart.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}

              {/* A quelle étage ? */}

              {/* Acheter ou louer ? */}

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel id="typeOffer">{"  Vendre ou louer ? :"}</FormLabel>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="typeOffert">
                    {" Vendre ou louer ?"}
                  </InputLabel>
                  <Select
                    labelId="typeOffert"
                    id="typeOffert"
                    name="typeOffert"
                    value={formik.values.typeOffert}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.typeOffert &&
                      Boolean(formik.errors.typeOffert)
                    }
                    MenuProps={MenuProps}
                  >
                    {data.typeOffert.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/*  Acheter ou louer ? */}

              {/* Dimension du terrain ? */}
              {formik.values.typeDoffre === "Terrain" ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="longueurTerrain">
                      {"  Entrer les dimensions du terrain:"}
                    </FormLabel>
                  </Grid>
                  {/* longueur */}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      id="longueurTerrain"
                      name="longueurTerrain"
                      placeholder="Longueur du terrain"
                      value={formik.values.longueurTerrain}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.longueurTerrain &&
                        Boolean(formik.errors.longueurTerrain)
                      }
                      helperText={
                        formik.touched.longueurTerrain &&
                        formik.errors.longueurTerrain
                      }
                    />
                  </Grid>
                  {/* longueur */}
                  {/* largeur */}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      id="largeurTerrain"
                      name="largeurTerrain"
                      placeholder="Largeur du terrain"
                      value={formik.values.largeurTerrain}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.largeurTerrain &&
                        Boolean(formik.errors.largeurTerrain)
                      }
                      helperText={
                        formik.touched.largeurTerrain &&
                        formik.errors.largeurTerrain
                      }
                    />
                  </Grid>
                </>
              ) : null}
              {/* largeur */}
              {/*  Entrer les dimension du terrain ? */}

              {/* Dimension magasin ou entrepot ou bureaux? */}

              {formik.values.typeDoffre === "Bureaux" ||
              formik.values.typeDoffre === "Boutique" ||
              formik.values.typeDoffre === "Magasin" ||
              formik.values.typeDoffre === "Entrepôt" ||
              formik.values.typeDoffre === "Salle de fête" ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="longueurTerrain">
                      {"  Entrer les dimensions de l'espace disponible:"}
                    </FormLabel>
                  </Grid>
                  {/* longueur */}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      id="longueurTerrain"
                      name="longueurTerrain"
                      placeholder="Longueur espace"
                      value={formik.values.longueurTerrain}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.longueurTerrain &&
                        Boolean(formik.errors.longueurTerrain)
                      }
                      helperText={
                        formik.touched.longueurTerrain &&
                        formik.errors.longueurTerrain
                      }
                      InputProps={{
                        startAdornment: <InputAdornment position="end">m</InputAdornment>,
                      }}
                    />
                  </Grid>
                  {/* longueur */}
                  {/* largeur */}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      id="largeurTerrain"
                      name="largeurTerrain"
                      placeholder="Largeur espace"
                      value={formik.values.largeurTerrain}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.largeurTerrain &&
                        Boolean(formik.errors.largeurTerrain)
                      }
                      helperText={
                        formik.touched.largeurTerrain &&
                        formik.errors.largeurTerrain
                      }
                      InputProps={{
                        startAdornment: <InputAdornment position="end">m</InputAdornment>,
                      }}
                    />
                  </Grid>{" "}
                </>
              ) : null}
              {/* largeur */}
              {/*  Dimension magasin ou entrepot ? */}

              {/* montant pour location */}

              {formik.values.typeOffert === "Louer" ? (
                <>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="montantMensuel">
                      {"Montant mensuelle à payer:"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{ display: "flex", flexDirection: "row", gap: 0 }}
                    >
                      <TextField
                        id="montantMensuel"
                        name="montantMensuel"
                        value={formik.values.montantMensuel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.montantMensuel &&
                          Boolean(formik.errors.montantMensuel)
                        }
                        helperText={
                          formik.touched.typeDoffre &&
                          formik.errors.montantMensuel
                        }
                        placeholder="Ex:50 000"
                      />
                      <TextField
                        id="devise"
                        name="devise"
                        placeholder="fcfa"
                        select
                        value={formik.values.devise}
                        defaultValue="fcfa"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.devise && Boolean(formik.errors.devise)
                        }
                        style={{ width: "90px" }}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                </>
              ) : null}
              {/*  montant pour location ? */}

              {/* montant pour achat */}

              {formik.values.typeOffert === "Vendre" ? (
                <>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="priceSale">
                      {"À quel prix vendez-vous ?:"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{ display: "flex", flexDirection: "row", gap: 0 }}
                    >
                      <TextField
                        id="priceSale"
                        name="priceSale"
                        value={formik.values.priceSale}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.priceSale &&
                          Boolean(formik.errors.priceSale)
                        }
                        helperText={
                          formik.touched.typeDoffre && formik.errors.priceSale
                        }
                        placeholder="Ex:50 000"
                      />
                      <TextField
                        id="devise"
                        name="devise"
                        placeholder="fcfa"
                        select
                        value={formik.values.devise}
                        defaultValue="fcfa"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.devise && Boolean(formik.errors.devise)
                        }
                        style={{ width: "90px" }}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                </>
              ) : null}
              {/*  montant pour achat ? */}

              {/* Nombre de mois pour le premier payement */}

              {formik.values.typeOffert === "Louer" ? (
                <>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="firstPayment">
                      {"Combien de mois pour le premier payement:"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="firstPayment"
                      name="firstPayment"
                      value={formik.values.firstPayment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstPayment &&
                        Boolean(formik.errors.firstPayment)
                      }
                      helperText={
                        formik.touched.typeDoffre && formik.errors.firstPayment
                      }
                      placeholder="Ex:2"

                      InputProps={{
                        startAdornment: <InputAdornment position="end">mois</InputAdornment>,
                      }}
                    />
                  </Grid>
                </>
              ) : null}
              {/*  Nombre de mois pour le premier payement */}

              {/* Nombre de mois pour la caution */}
              {formik.values.typeOffert === "Louer" ? (
                <>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormLabel id="caution">
                      {"Combien de mois pour la caution:"}
                    </FormLabel>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="caution"
                      name="caution"
                      value={formik.values.caution}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.caution && Boolean(formik.errors.caution)
                      }
                      helperText={
                        formik.touched.typeDoffre && formik.errors.caution
                      }
                      placeholder="Ex:2"
                      InputProps={{
                        startAdornment: <InputAdornment position="end">mois</InputAdornment>,
                      }}
                    />
                  </Grid>
                </>
              ) : null}
              {/*  Nombre de mois pour la caution */}

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel id="localisationPays">
                  {" Le pays ou se trouve le bien:"}
                </FormLabel>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="localisationPays">
                    {"Le pays ou se trouve le bien"}
                  </InputLabel>
                  <Select
                    labelId="localisationPays"
                    id="localisationPays"
                    name="localisationPays"
                    value={formik.values.localisationPays}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.localisationPays &&
                      Boolean(formik.errors.localisationPays)
                    }
                    MenuProps={MenuProps}
                  >
                    {data.listOfSelectCountry.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel id="localisationVille">
                  {" La ville ou se trouve le bien:"}
                </FormLabel>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="localisationVille">
                    {"La ville ou se trouve le bien"}
                  </InputLabel>
                  <Select
                    labelId="localisationVille"
                    id="localisationVille"
                    name="localisationVille"
                    value={formik.values.localisationVille}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.localisationVille &&
                      Boolean(formik.errors.localisationVille)
                    }
                    MenuProps={MenuProps}
                    disabled={
                      formik.values.localisationPays === "" ? true : false
                    }
                  >
                    {formik.values.localisationPays === "Bénin" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Burkina Faso" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Cameroun" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Centrafrique" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Congo Brazaville" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Côte D'ivoire" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Gabon" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Guinée" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Guinée équatoriale" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Mali" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Niger" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "RDC" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Sénégal" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Tchad" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                    {formik.values.localisationPays === "Togo" ? (
                      data[formik.values.localisationPays].map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(theme)}
                        >
                          {name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem></MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel id="localisationQuartier">
                  {" L'adresse ou se trouve le bien:"}
                </FormLabel>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  id="localisationQuartier"
                  name="localisationQuartier"
                  placeholder="Adresse ou Quartier"
                  value={formik.values.localisationQuartier}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.localisationQuartier &&
                    Boolean(formik.errors.localisationQuartier)
                  }
                  helperText={
                    formik.touched.localisationQuartier &&
                    formik.errors.localisationQuartier
                  }
                />
                 <TextField
                  fullWidth
                  id="imageFile"
                  name="imageFile"
                  placeholder="image file"
                  value={myImage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ display: "none" }}
                /> 
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel id="telephoneNumber">
                  {" entrer votre numero de telephone:"}
                </FormLabel>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  id="telephoneNumber"
                  name="telephoneNumber"
                  placeholder="numero de telephone"
                  value={formik.values.telephoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.telephoneNumber &&
                    Boolean(formik.errors.telephoneNumber)
                  }
                  helperText={
                    formik.touched.telephoneNumber &&
                    formik.errors.telephoneNumber
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                spacing={1}
              >
                <FormLabel id="description">
                  {" décrire encore plus votre bien:"}
                </FormLabel>
                <TextField
                  multiline
                  fullWidth
                  rows={6}
                  id="description"
                  name="description"
                  placeholder="décrire encore plus votre bien"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
                spacing={1}
              >
                <FormControl variant="standard">
                  <FormLabel
                    id="image"
                    sx={{
                      color: "#838181",
                      textDecoration: "underline",
                      border: "2px solid #838181",
                      minWidth: "280px",
                      display: "flex",
                      /* flexDirection: "column", */
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    Insérer des images du bien{"(max 5 images) "}
                    <span>
                      <DownloadForOfflineIcon />
                    </span>
                    <input
                      multiple={true}
                      type="file"
                     /*  id="imageFile"
                      name="imageFile" */ 
                      onChange={uploadAvatar}
                      onBlur={formik.handleBlur}
                      style={{ display: "none" }}
                    />
                  </FormLabel>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <ImageList sx={{ minWidth: "280px", margin: "10px 5px 60px 5px" }}>
            {uploading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              myImage.map((item, index) => (
                <ImageListItem key={item}>
                  <IconButton
                    sx={{ color: "rgba(237, 78, 78, 0.54)" }}
                    aria-label={`info about ${item}`}
                    onClick={() => {
                      deleteImage(item);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>

                  <Image
                    src={`${CDNURL}/${item}`}
                    alt={item.path}
                    loading="lazy"
                    width={200}
                    height={200}
                  />
                  {/* <ImageListItemBar
                        title={item.fileName}
                        subtitle={item.fileName}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.fileName}`}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      /> */}
                </ImageListItem>
              ))
            )}
          </ImageList>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled= {( formik.isSubmitting  ||  !formik.isValid ) 
              || uploading
              || formik.values.typeDoffre===""
              || formik.values.imageFile.length===0
              || formik.values.localisationPays===""
              || formik.values.localisationVille===""
              || formik.values.localisationQuartier===""
            } 
            sx={{ width: "70%", marginBottom: "10px" }}
            onClick={() => {
              formik.values.imageFile = myImage;
            }}
          >
            Envoyer
          </Button>
        </form>
      </Box>
    </>
  );
}

export default InsertDataProprietaire;

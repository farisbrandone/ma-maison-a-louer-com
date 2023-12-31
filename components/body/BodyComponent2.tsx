"use client";
import * as React from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
  Pagination,
  InfoIcon,
  Image,
  PaginationControlled,
  Header,
  Typography,
  Box,
} from "../muiExportComponent/MuiForpage";
import { Database } from "@/types/database";
import SnackComponent from "@/components/SnackComponent";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Theme, useTheme, createTheme } from "@mui/material/styles";
import LoadingPage from "../LoadingPage";
import Masonry from "@mui/lab/Masonry";

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

export type dataRows = Database["public"]["Tables"]["tableDesOffres"]["Row"][];
type initialValueAndTable = typeInitialValue[];
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
const CDNURL =
  "https://tkvtphatpjsobxkwbqmd.supabase.co/storage/v1/object/public/catalogue_images";

/* const breakpoints = {
  xs: 380,
  sm: 800,
  md: 1200,
  lg: 1600,
  xl: 2000,
}; */

/* const theme = createTheme({
  breakpoints: {
    values: { xs:0, sm:280, md: 600, lg:900, x  l:1200  }
  }
}); */
/* const widths =
  window.innerWidth < breakpoints.xs
    ? 1
    : window.innerWidth < breakpoints.sm
    ? 2
    : window.innerWidth < breakpoints.md
    ? 3
    : window.innerWidth < breakpoints.lg
    ? 4
    : 5; */
export default function Bodypage2({ session }: { session: Session | null }) {
  const [dataDisplay, setDataDisplay] = React.useState<dataRows>([]);
  const [loading, setLoading] = React.useState(true);
  /* const [columns, setcolumns] = React.useState(widths); */
  const [refresh, setRefresh] = React.useState(true);
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [payss, setPayss] = React.useState("");
  const [citys, setCitys] = React.useState("");
  const [indexFirst, setIndexFirst] = React.useState(0);
  const [indexLast, setIndexLast] = React.useState(2);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const params = [];

  for (let entry of searchParams.entries()) {
    params.push(entry);
  }
  let keys: string[] = [];
  let values: string[] = [];
  for (const [key, value] of params) {
    keys.push(key);
    values.push(value);
  }
 
  const supabase = createClientComponentClient<Database>();
  const theme = useTheme();
  /* const getcolumns = (width: number) => {
    if (width < breakpoints.xs) {
      return 1;
    } else if (width < breakpoints.sm) {
      return 2;
    } else if (width < breakpoints.md) {
      return 3;
    } else if (width < breakpoints.lg) {
      return 4;
    } else if (width < breakpoints.xl) {
      return 5;
    } else {
      return 6;
    }
  }; */

  /* const updatedimensions = () => {
    setcolumns(() => getcolumns(window.innerWidth));
  }; */
  /*************************** useCallback part********************* */

  const getProfile = React.useCallback(async () => {
    const lengthKeys = keys.length;

    try {
      setLoading(true);
      let query = supabase
        .from("tableDesOffres")
        .select("*", { count: "exact" });
      if (lengthKeys === 2) {
        setCitys(values[0]);
        setPayss(values[1]);
        query = query
          .eq(keys[0], values[0])
          .eq(keys[1], values[1])
          .range(indexFirst, indexLast);
      }
      if (lengthKeys === 1) {
        query = query.eq(keys[0], values[0]).range(indexFirst, indexLast);
      }
      if (lengthKeys === 3) {
        setCitys(values[0]);
        setPayss(values[1]);
        query = query
          .eq(keys[0], values[0])
          .eq(keys[1], values[1])
          .eq(keys[2], values[2])
          .range(indexFirst, indexLast);
      }

      const { data, error, status, count } = await query;

      if (error && status !== 406) {
        throw error;
      }
      if (data && count) {
        if (data.length > 0) {
        
          setDataDisplay(data);
          setTotalCount(count);
        } else {
         
          setDataDisplay(data);
          setTotalCount(count);
          /* alert("Pas de données existant correspondant à votre recherche") */
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [supabase, indexFirst, indexLast, searchParams]);

  /*************************** useCallback part********************* */
   React.useEffect(() => {
    
    getProfile();
   /*  window.addEventListener("resize", updatedimensions);
    console.log(columns);
    return () => window.removeEventListener("resize", updatedimensions); */
  }, [getProfile, searchParams]); 

  /*****************************colmun resize****************************** */

  if (loading) {
    return (
      <>
        <Header
          session={session}
          setDataDisplay={setDataDisplay}
          setRefresh={setRefresh}
          citys={citys}
          setCitys={setCitys}
          payss={payss}
          setPayss={setPayss}
        />

        <Box sx={{ marginTop: "200px" }}>
          <LoadingPage />
        </Box>
      </>
    );
  }
  if (dataDisplay.length === 0 && !loading) {
    return (
      <>
        <Header
          session={session}
          setDataDisplay={setDataDisplay}
          setRefresh={setRefresh}
          citys={citys}
          setCitys={setCitys}
          payss={payss}
          setPayss={setPayss}
        />
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
            Aucune offre disponible pour votre demande ou Problème de connection
            . réessayez SVP...
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <div>
      <Header
        session={session}
        setDataDisplay={setDataDisplay}
        setRefresh={setRefresh}
        citys={citys}
        setCitys={setCitys}
        payss={payss}
        setPayss={setPayss}
      />
      <SnackComponent />
      <div
        style={{
          marginTop: "150px",
          marginBottom: "15px",
          padding: "0px 5px 0px 5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "90px",
        }}
      >
        {/* <ImageList
          sx={{ minWidth: "280px", margin: "100px 5px 60px 5px" }}
          cols={columns}
        > */}
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ xs: 1, sm: 2 }} /* sx={{marginBottom:"100px"}} */
        >
          {dataDisplay.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/api/oneimagePage?value=${item.id}`);
              }}
            >
              <Image
                src={item.imageFile ? `${CDNURL}/${item.imageFile[0]}` : "#"}
                /* srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`} */
                alt={
                  item.typeDoffre ? item.typeDoffre : "probleme de connection"
                }
                loading="lazy"
                width={200}
                height={200}
                style={{ width: "100%", height: "100%" }}
              />
              <ImageListItemBar
                title={
                  item.typeDoffre ?item.typeDoffre + " à " + item.typeOffert : "probleme de connection"
                }
                subtitle={`${ " 🌍 "+
                  item.localisationQuartier !== "null"
                    ? item.localisationQuartier + " - "
                    : ""
                }
             ${
               item.localisationVille !== "null"
                 ? item.localisationVille + " - "
                 : ""
             }
             ${item.localisationPays !== "null" ? item.localisationPays : ""}
             `}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.typeDoffre}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </Masonry>
        
        {/*  </ImageList> */}
        <PaginationControlled
          setIndexFirst={setIndexFirst}
          indexFirst={indexFirst}
          setIndexLast={setIndexLast}
          indexLast={indexLast}
          setTotalCount={setTotalCount}
          totalCount={totalCount}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

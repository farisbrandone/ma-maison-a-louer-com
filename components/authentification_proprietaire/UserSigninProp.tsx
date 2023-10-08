"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const dynamic = 'force-dynamic'
interface typeInitialValue {
  email: string;
  password: string;
}
type initialValueAndNull = typeInitialValue | null;
const initialValues: typeInitialValue = {
  email: "",
  password: "",
};

//------ part of yup----------
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("email is Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const validateComments = (values: typeInitialValue) => {
  let error;
  if (!values) {
    error = "comments is not required";
  }
  return error;
};

const onSubmit = async (
  values: typeInitialValue,
  onSubmitProps: FormikHelpers<typeInitialValue>
) => {
  /*   const body = new FormData();
    Object.entries(values).forEach(([ key, val ]) => {
      body.append(key, val);
    });
    console.log("onsubmitprops", onSubmitProps);
     await fetch("http://localhost:3001/auth/signin/router",
   { method:"POST",
   body,
},)   */
  /*  router.push(`/api/signin?email=${values.email}&password=${values.password}`)  */
 
};



function UserSigninProp() {
  const [formValues, setFormValues] = useState<initialValueAndNull>(null);
  const searchParams = useSearchParams();
  const loadingParams = searchParams.get("error");
  const router = useRouter();
 
  const formik = useFormik({
    //useformik return an object
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
   
  });
 /*  const styles = {
    minWidth:"400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // Adding media query..
    '@media (max-width: 400px)': {
      minWidth:"300px",
    },
  }; */
  
  return (
    <Box
      sx={{
        minWidth: { xs: "280px", sm: "350px", md: "450px" },
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#fefdfd",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <form
       className="formAuth"
         style={{
          minWidth:"300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }} 
        method="post"
        action="/auth/signinprop"
      >
        <Stack spacing={2} sx={{width:{ xs: "300px", sm: "350px", md: "400px" }}}>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent:"center",
            }}
          >
            <Box
              sx={{
                width:"100%",
                display: "flex",
                flexDirection: "row",
                gap: "0px",
                alignItems: "center",
                justifyContent:"center",
                marginLeft:"40px",
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
                component="h6"
                sx={{
                 /*  flexGrow: 1, */
                  color: "black",
                   /*  display: "flex",
                        justifyContent: "center",
                        alignItems: "center",  */
                }}
              >
                mamaisonalouer.com
              </Typography>
             
            </Box>
            {searchParams ? (
                <Typography variant="h6" color="error">
                  {searchParams.get("error")}
                </Typography>
              ) : null}
          </Stack>

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder="Enter your email"
          />

          <TextField
            fullWidth
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

            <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid || formik.values.password==="" ||formik.values.email===""}  
         >
            Connection
          </Button>  

          <Button
            variant="contained"
            color="success"
             disabled={formik.isSubmitting || !formik.isValid} 
           /*  onClick={()=>router.push("/authentification_user/user_signup")} */
         >
          <Link  href="/authentification_proprietaire/signup" style={{textDecoration:"none", color:"white"}}>
          
            Inscription
          </Link>
          </Button>  
          <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", fontSize:"12px"}}>
            <Typography>
              Mot de passe oubliée
            </Typography>
            <Link href="/authentification_proprietaire/signvalidate" >Cliquez ici</Link>
          </Box>

        </Stack>
      </form>

     
    </Box>
  );
}

export default UserSigninProp;

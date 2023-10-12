"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import {
  Avatar,
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
export const dynamic = "force-dynamic";
interface typeInitialValue {
  email: string;
 
}
type initialValueAndNull = typeInitialValue | null;
const initialValues: typeInitialValue = {
  email: "",
  
};

//------ part of yup----------
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("email is Required"),
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

function UserValidate() {
  const [formValues, setFormValues] = useState<initialValueAndNull>(null);
  const searchParams = useSearchParams();
  const loginParams = Boolean(searchParams.get("loading"));
  const message = searchParams.get("message");
  const router = useRouter();

  const formik = useFormik({
    //useformik return an object
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

 
  return (
    <Box
      sx={{
        minWidth:  { xs: "280px", sm: "350px", md: "450px" },
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#fefdfd",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius:"20px",
      }}
    >
      <form
        style={{
          minWidth:"300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        method="post"
        action="/auth/signvalidate"
      >
        <Stack spacing={2} sx={{ width:{ xs: "300px", sm: "350px", md: "400px" } }}>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "0px",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "40px",
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
              searchParams.get("message") ? (
                <Typography variant="subtitle1" color="success" sx={{color:"#037f03", width:"70%", textAlign:"center"}}>
                  {searchParams.get("message")}
                </Typography>
              ) : searchParams.get("error") ? (
                <Typography variant="h6" color="error">
                  {searchParams.get("error")}
                </Typography>
              ) : null
            ) : null}
          </Stack>
          {
            !searchParams.get("message")?(
                <>
                 <TextField
            fullWidth
            id="email"
            name="email"
            label="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid || loginParams ||formik.values.email===""}
          >
            {"Envoyer"}
          </Button>
                </>
            ):null
          }
         
        </Stack>
      </form>
    </Box>
  );
}

export default UserValidate;

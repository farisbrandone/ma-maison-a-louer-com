"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import Link from "next/link";

interface typeInitialValue {
  name: string;
  email: string;
}
type initialValueAndNull = typeInitialValue | null;
const initialValues: typeInitialValue = {
  name: "",
  email: "",
};

const onSubmit = (
  values: typeInitialValue,
  onSubmitProps: FormikHelpers<typeInitialValue>
) => {
 
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

//------ part of yup----------
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("email is Required"),
});

function PostAnnonce() {
  const [formValues, setFormValues] = useState<initialValueAndNull>(null);

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false} //n'effectu le controle de la validité si changement de la valeur controler et affiche l'erreur meme sans soumision
      validateOnBlur={true} //n'affiche les erreurs qu'a pres soumission du formulaire et uniquement sur les onglet activés
      /* validateOnMount */
      enableReinitialize
    >
      {(formik) => {
       
        return (
          <Box
            sx={{
               minWidth: "260px",
              minHeight: "100vh", 
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
             
            }}
          >
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fefdfd",
                boxShadow: "rgba(27, 53, 200, 0.35) 0px 5px 15px",
                borderRadius: "5px",
                padding:"20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    spacing={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0px",
                        alignItems: "center",
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
                          flexGrow: 1,
                          color: "black",
                          /*  display: "flex",
                        justifyContent: "center",
                        alignItems: "center", */
                        }}
                      >
                        mamaisonalouer.com
                      </Typography>
                    </Box>
                  </Stack>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Nom"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

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
                     sx={{color:"white"}}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    Se connecter
                  </Button>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "2px" }}
                  >
                    <Typography color="primary">
                      {"Si vous n'êtes pas inscript"}
                    </Typography>
                    <Link
                      href="/postAnnonce/inscriptionPost"
                      style={{
                        color: "#e4cb28",
                        textDecorationLine: "underline",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {"S'inscrire"}{" "}
                    </Link>
                  </Box>
                </Stack>
              </Box>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
}

export default PostAnnonce;

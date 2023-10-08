"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
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

interface typeInitialValue {
  name: string;
  email: string;
  radioOption: string;
}
type initialValueAndNull = typeInitialValue | null;
const initialValues: typeInitialValue = {
  name: "",
  email: "",
  radioOption: "",
};

const onSubmit = (
  values: typeInitialValue,
  onSubmitProps: FormikHelpers<typeInitialValue>
) => {
  console.log("values is", values);
  console.log("onsubmitprops", onSubmitProps);
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

function InscriptionPost() {
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
        /*  console.log("formik props", formik); */
        return (
          <Box
            sx={{
              minWidth: "260px",
              height: "100vh",
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
                color: "#fffffff",
                backgroundColor: "#25d366",
                boxShadow: "rgba(13, 47, 242, 0.35) 0px 5px 15px",
                borderRadius: "5px",
                padding: "20px",
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
                          color: "white",
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
                  />
                  <FormControl>
                    <FormLabel id="radioOption">
                      Quelle posture avez-vouz ?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="radioOption"
                      name="radioOption"
                      value={formik.values.radioOption}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value="Propriétaire"
                        control={<Radio />}
                        label="Propriétaire"
                        sx={{ color: "white" }}
                      />
                      <FormControlLabel
                        value="Agent Immobilier"
                        control={<Radio />}
                        label="Agent Immobilier"
                        sx={{ color: "white" }}
                      />
                    </RadioGroup>
                  </FormControl>

                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {"S'inscrire"}
                  </Button>
                </Stack>
              </Box>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
}

export default InscriptionPost;

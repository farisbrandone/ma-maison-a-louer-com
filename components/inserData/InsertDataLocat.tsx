"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, useFormik } from "formik";
import { useSearchParams } from "next/navigation";
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
  MenuItem,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";

interface typeInitialValue {
  name: string;
  email: string;
  address: string;
  radioOption: string;
  typeDoffre: string;
  MontantApayer: number;
  localisationBien: string;
  devise:string;
}
type initialValueAndNull = typeInitialValue | null;
const initialValues: typeInitialValue = {
  name: "",
  email: "",
  address: "",
  radioOption: "",
  typeDoffre: "",
  MontantApayer: 0,
  localisationBien: "",
  devise:"fcfa",
};
export const currencies = [
  {
    value: "Francs cfa",
    label: "fcfa",
  },
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
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
  address: Yup.string().required("address required"),
  radioOption: Yup.string().required("radioOption required"),
  typeDoffre: Yup.string().required("Type d'offre required"),
  MontantApayer: Yup.string().required("Montant à payer is required"),
  localisationBien: Yup.string().required("Localisation bien is required"),
  devise: Yup.string().required("devise is required"),

});

const validateComments = (values: typeInitialValue) => {
  //Part of field level validation for special logique to detemine error
  let error;
  if (!values) {
    error = "comments is not required";
  }
  return error;
};


function InsertDataLocat() {
  const [formValues, setFormValues] = useState<initialValueAndNull>(null);
  const searchParams = useSearchParams();
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
              minWidth: { xs: "280px", sm: "550px", md: "650px", lg: "700px" },
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              backgroundColor: "#fefdfd",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginBottom:{ xs: "80px", sm: "0px"},
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
              }}
              method="post"
              action="/insertData/dataLocataire"
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
                    <Typography color="primary">
                      SVP Entrer les informations demandées ci-dessous
                    </Typography>
                    {searchParams ? (
                <Typography variant="subtitle1" color="error">
                  {searchParams.get("error")}
                </Typography>
              ) : null}
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
                    id="address"
                    name="address"
                    label="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />

                  {/*  <FastField name="address">
                    {(props: any) => {
                      const { field, form, meta } = props;
                      console.log("fiels is", field);
                      return (
                        <TextField
                          fullWidth
                          id="address"
                          name={field.name}
                          label="Address"
                          value={field.values}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          error={meta.touched && meta.error}
                          
                        />
                      );
                    }}
                  </FastField> */}

                  <FormControl>
                    <FormLabel id="radioOption">
                      Que souhaitez vous faire
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="radioOption"
                      name="radioOption"
                      value={formik.values.radioOption}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value="Louer"
                        control={<Radio />}
                        label="Louer"
                      />
                      <FormControlLabel
                        value="Acheter"
                        control={<Radio />}
                        label="Acheter"
                      />
                    </RadioGroup>
                  </FormControl>

                  <Stack spacing={1}>
                    <FormLabel id="typeDoffres">
                      {"Type de bien à acheter ou louer"}
                    </FormLabel>
                    <TextField
                      fullWidth
                      id="typeDoffre"
                      name="typeDoffre"
                      value={formik.values.typeDoffre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.typeDoffre &&
                        Boolean(formik.errors.typeDoffre)
                      }
                      helperText={
                        formik.touched.typeDoffre && formik.errors.typeDoffre
                      }
                      placeholder="Ex:Appart :2ch,2dch et 1cuisine"
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <FormLabel id="MontantApayer">
                      {"Montant disposer à payer"}
                    </FormLabel>
                    <Box  style={{ display: "flex", flexDirection:"row", gap:0}}>
                      <TextField
                        id="MontantApayer"
                        name="MontantApayer"
                        value={formik.values.MontantApayer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.MontantApayer &&
                          Boolean(formik.errors.MontantApayer)
                        }
                        helperText={
                          formik.touched.typeDoffre &&
                          formik.errors.MontantApayer
                        }
                        placeholder="Ex:50 000 fcfa/mois"
                      />
                      <TextField
                        id="devise"
                        name="devise"
                        select
                        value={formik.values.devise}
                        defaultValue="fcfa"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.devise &&
                          Boolean(formik.errors.devise)
                        }
                        style={{width:"90px"}}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Stack>

                  <Stack spacing={1}>
                    <FormLabel id="localisationBien">
                      {"Localisation souhaiter pour le bien"}
                    </FormLabel>
                    <TextField
                      fullWidth
                      id="localisationBien"
                      name="localisationBien"
                      value={formik.values.localisationBien}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.localisationBien &&
                        Boolean(formik.errors.localisationBien)
                      }
                      helperText={
                        formik.touched.typeDoffre &&
                        formik.errors.localisationBien
                      }
                      placeholder="Ex:ville-address"
                    />
                  </Stack>

                  {/* <Button variant="contained" color="success" type="reset">
                    Reset
                  </Button> */}
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </form>
          </Box>
        );
    
   
 
}

export default InsertDataLocat;

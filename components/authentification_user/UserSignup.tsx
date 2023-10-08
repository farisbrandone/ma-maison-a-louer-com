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
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export const dynamic = "force-dynamic";
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

function UserSignup() {
  const [formValues, setFormValues] = useState<initialValueAndNull>(null);
  const searchParams = useSearchParams();
  const loginParams = Boolean(searchParams.get("loading"));
  const message = searchParams.get("message");
  const router = useRouter();
  const [confirmPassword, setConfirmPassword]=React.useState("")
  const [trueConfirmation, setTrueConfirmation]=React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    //useformik return an object
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

 const  onchangePassword=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    e.preventDefault();
    setConfirmPassword(e.target.value)
  }
  React.useEffect(() => {
   if (confirmPassword===formik.values.password){
    setTrueConfirmation(true)
   }
   else{
    setTrueConfirmation(false)
   }
  }, [confirmPassword])

  console.log("form errors", formik.errors);
  return (
    <Box
      sx={{
        minWidth: { xs: "280px", sm: "500px", md: "600px" },
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
        style={{
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        method="post"
        action="/auth/signup"
      >
        <Stack spacing={2} sx={{ width: "100%" }}>
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


<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="outlined-adornment-password">{formik.touched.password && formik.errors.password}</FormHelperText>
        </FormControl>


        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Confirm your password"
            value={confirmPassword}
            onChange={(e)=>onchangePassword(e)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="outlined-adornment-password" style={{color:(trueConfirmation && confirmPassword!=="")?"#0bee5b":"#9a0707"}} >{(trueConfirmation)?"mots de passe confirmé":(!trueConfirmation && confirmPassword!=="")?"mots de passe non confirmé":""}</FormHelperText>
        </FormControl>




         {/*  <TextField
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
          <TextField
            fullWidth
            type="password"
            label="Confirm your password"
            value={confirmPassword}
            onChange={(e)=>onchangePassword(e)}
            helperText={trueConfirmation?"mots de passe confirmé":"mots de passe non confirmé"}
          /> */}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid || loginParams || trueConfirmation}
          >
            {"S'inscrire"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default UserSignup;

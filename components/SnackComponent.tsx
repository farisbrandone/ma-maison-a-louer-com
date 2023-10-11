"use client"

import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackComponent() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
 
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (searchParams) {
      setOpen(true);
    }
  }, [searchParams]);

  if (searchParams.get("message") ||searchParams.get("error") ){
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert onClose={handleClose} severity={searchParams.get("message")?`success`:`error`} sx={{ width: "100%", display:searchParams?"flex":"none" }}>
          {searchParams ? (
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center" }}
            >
              {searchParams.get("message")?searchParams.get("message"):searchParams.get("error")}
            </Typography>
          ) : null}
        </Alert>
      </Snackbar>
    );
  }
  else return null

}

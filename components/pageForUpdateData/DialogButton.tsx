import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from 'next/navigation';

interface EnhancedTableToolbarProps {
  selected:readonly string[]
}

export default function DialogButton(props:EnhancedTableToolbarProps) {
  const router=useRouter();
  const [open, setOpen] = React.useState(false);
  const [controEffect, setControEffect]=React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
    setControEffect(false)
  };

  const handleClose = () => {
    setOpen(false);
    setControEffect(false)
  };

  const handleDelete=()=>{
      setControEffect(true)
      setOpen(false);
  }

  React.useEffect(() => {
    console.log(controEffect)
    const body=[...props.selected]
    const data1=JSON.stringify(body)
    if (controEffect){
      const fetchData = async () => {
        const response = await fetch(`/api/deleteForUpdate`, {
          method:"POST",
          body:data1
        });
        const data = await response.json();
        console.log(data)
      };
     
      fetchData();
      setControEffect(false)
    } 
  }, [controEffect,props.selected])

  return (
    
    <div  >
      <Button variant="outlined" onClick={handleClickOpen}>
      <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ête vous sur de supprimer ces données ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Non</Button>
          <Button   onClick={handleDelete}  autoFocus >
            Oui
          </Button>
          
        </DialogActions>
      </Dialog>
      
    </div>
    
  );
}
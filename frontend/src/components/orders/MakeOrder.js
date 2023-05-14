import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { InputLabel, TextField } from '@mui/material';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const rx_live = /^[0-9]?\d*(?:[-]\d*)?(?:[0-9]\d*)?(?:[-]\d*)?(?:[0-9]\d*)?$/;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'chocolate',
  '&:hover': {
    backgroundColor: 'chocolate',
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

let logedUser = null;

export default function CustomizedDialogs({User, totalParse}) {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [open, setOpen] = React.useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Adress, setAdress] = useState('');
  const [City, setCity] = useState('');
  const [PhoneNumber, setPhoneNuber] = useState('');
  const Status = 0;

  const navigate = useNavigate();
  logedUser = location.state.user;

  React.useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  const dateNow = new Date();
  let date = moment(dateNow, 'MM/DD/YYYY').format("DD/MM/YYYY");
  date = date.split('T')[0];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOrder = async(e) => {
    e.preventDefault(); 

    const url = 'http://localhost:3000/Sweet/addOrders';
    await fetch(url, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            UserId: user._id,
            Status: Status,
            FirstName: FirstName,
            LastName: LastName,
            Adress: Adress,
            City: City,
            PhoneNumber: PhoneNumber,
            date: date,
            TotalPrice: totalParse
        })
    })
    .then(() => {
      navigate('/Sweet/orders', {state: {user:  logedUser}});
    })
  }

  const checkAndSetPrice = (e) => {
    if (rx_live.test(e)) {
        setPhoneNuber(e);
    }
  }

  return (
    <div>
      <Button variant="contained" color="secondary" className="orderButton" sx={{mb: 4}} onClick={handleClickOpen}>
        Napravi narudžbu
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      ><form onSubmit={addOrder}  className='order'>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Lični podaci
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div style={{display: "flex"}}>
              <InputLabel className="orderLabel" sx={{mb: 0.5, pr: 19.8, mr: 2}} style={{color: "revert"}}>
                Unesite ime
              </InputLabel>
              <InputLabel className="orderLabel" sx={{pr: 16, mb: 0.5}} style={{color: "revert"}}>
                Unesite prezime
              </InputLabel></div>
            <div style={{display: "flex"}}>
              <TextField fullWidth required id="outlined-required" label="Ime" autoComplete="off" value={FirstName}
              onChange={(e) => setFirstName(e.target.value)} sx={{mr: 2}} inputProps={{ minLength: 3, maxLength: 15}} />  
              <TextField fullWidth required id="outlined-required" label="Prezime" autoComplete="off" value={LastName}
              onChange={(e) => setLastName(e.target.value)} inputProps={{ minLength: 4, maxLength: 15}} />   </div>
              <InputLabel className="orderLabel" sx={{mt: 1.2, mb: 0.5, mr: 0.5}} style={{color: "revert"}}>
                Unesite adresu
              </InputLabel>
              <TextField fullWidth required id="outlined-required" label="Adresa" autoComplete="off" value={Adress}
              onChange={(e) => setAdress(e.target.value)} sx={{width: 500}} inputProps={{ minLength: 5, maxLength: 40 }} />
              <InputLabel className="orderLabel" sx={{mt: 1.2, mb: 0.5, mr: 0.5}} style={{color: "revert"}}>
                Unesite grad
              </InputLabel>
              <TextField fullWidth required id="outlined-required" label="Grad" autoComplete="off" value={City}
              onChange={(e) => setCity(e.target.value)} sx={{width: 500}} inputProps={{ minLength: 4, maxLength: 25 }} />
              <InputLabel className="orderLabel" sx={{mt: 1.2, mb: 0.5, mr: 0.5}} style={{color: "revert"}}>
                Unesite broj telefona
              </InputLabel>
              <TextField required id="outlined-required" label="Broj telefona" autoComplete="off" helperText="Format: 061111111"
              value={PhoneNumber} onChange={(e) => checkAndSetPrice(e.target.value)} sx={{width: 500}} inputProps={{ minLength: 9, maxLength: 10 }} />
            </DialogContent>
            <DialogActions>
              <ColorButton className='makeOrder' autoFocus variant='contained' type='submit'>
                Pošalji narudžbu
              </ColorButton>
            </DialogActions> </form>
      </BootstrapDialog>
    </div>
  );
}
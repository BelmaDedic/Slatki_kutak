import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

let logedUser = null;

export default function AlertDialog({User}){
  const location = useLocation();
  const [user, setUser] = React.useState(location.state.user);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();
  logedUser = location.state.user;

  React.useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unsubscribe = () => {
    const url = 'http://localhost:3000/Sweet/subscribe/' + user._id;
    fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email
      })
    })
    .then(() => {
      setOpen(false);
      navigate('/Home', {state: {user:  logedUser}});
    })
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'chocolate',
    '&:hover': {
      backgroundColor: 'chocolate',
    },
  }));

  return (
    <div>
     <ColorButton variant="contained" className="button" onClick={handleClickOpen}>Otkaži pretplatu</ColorButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="unsubscribe">
          <DialogTitle id="alert-dialog-title">
            Otkaži pretplatu
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{color: "black", fontWeight: 400}}>
              Ukoliko otkažete pretplatu, nećemo Vam slati informacije o novim poslasticama.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Odustani</Button>
            <Button onClick={unsubscribe} autoFocus>
              Otkaži pretplatu
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
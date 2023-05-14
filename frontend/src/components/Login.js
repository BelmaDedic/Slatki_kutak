import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom';

const url = "http://localhost:3000";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Slatki kutak'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({ logging, guest }) {

  const [userLoging, setUserLoging] = useState([]);
  const [userLogingError, setUserLogingError] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const dataFetch = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        password: data.get("password"),
    }),
  });
  let Fdata = await dataFetch.json(); 
  console.log(Fdata); 
  navigate('/Home', {state: {user:  Fdata}});

  if (Fdata === "User not found") {
    Fdata = false;
    setUserLogingError(true);
    navigate('/');
  }
  
  setUserLoging(Fdata);
  logging(Fdata);
  };

  const setGuest = async () => {
    const data = await fetch(url + "/GetGuest");
    const guestLogin = await data.json();
    guest(guestLogin[0]);
    navigate('/Home', {state: {user:  guestLogin[0]}});
  };

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Prijavi se
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Korisničko ime"
                name="name"
                autoComplete="off"
                autoFocus
                error={userLogingError}
              />
              <TextField  type={passwordShown ? "text" : "password"} 
                margin="normal"
                required
                fullWidth
                name="password"
                label="Lozinka"
                id="password"
                error={userLogingError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end"  onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      { passwordShown ? < VisibilityOffIcon /> : <VisibilityIcon /> }
                    </InputAdornment>
                  ),
                }}
              /> 
              <br/>
              {userLogingError && <div style={{color: "red"}}>* Korisničko ime ili lozinka koju ste unijeli je pogrešna!</div>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
              >
                Prijavi se
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={setGuest} variant="body2" style={{ cursor: 'pointer' }}>
                    Prijavite se kao gost
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2" style={{ cursor: 'pointer' }}>
                    {"Nemate račun? Registrujte se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
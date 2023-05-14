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

export default function SignUp({ logging }) {

  const [passwordShown, setPasswordShown] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userExist, setUserExist] = useState(false);

  const navigate = useNavigate();
  
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const fetchSignUp = async (event) => {
    event.preventDefault();
    const ifUserExist = await fetch(url + '/ifUserExist/' + name);
    const ifUserExistJson = await ifUserExist.json();

    if(ifUserExistJson === false) {
      const addUser = await fetch(url + "/SignUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name, 
          password: password,
          email: email 
        }),
      });
      let dataFetch = await addUser.json();
      
      setUserExist(false);
      logging(dataFetch);
      navigate('/');
    } else {
      setUserExist(true);
    }
  };

  const nameHandeler = (e) => {
    setName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signUp">
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
            <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registruj se
            </Typography>
            <Box component="form" onSubmit={fetchSignUp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Korisničko ime"
                name="name"
                autoComplete="off"
                autoFocus
                onChange={nameHandeler}
                inputProps={{ minLength: 5 }}
              />
              {userExist && <div style={{color: "red"}}>* Uneseno korisničko ime već postoji. Unesite drugo!<br/></div>}
              <TextField  type={passwordShown ? "text" : "password"} 
                margin="normal"
                required
                fullWidth
                name="password"
                label="Lozinka"
                id="password"
                onChange={passwordHandler}
                inputProps={{ minLength: 8 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end"  onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      { passwordShown ? < VisibilityOffIcon /> : <VisibilityIcon /> }
                    </InputAdornment>
                  ),
                }}
              /> 
              <br/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
              >
                Registruj se
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Već imate račun? Prijavite se"}
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
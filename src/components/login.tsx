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
import { useNavigate } from 'react-router-dom';

import { Link as RouterLink } from "react-router-dom";
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {
  // State for checking against invalid Email Address
  const [invalidEmail, setInvalidEmail] = useState(false)
  const navigate = useNavigate();

  const objLoad = JSON.parse(localStorage.getItem('users') || '[]'); // Load list of users
  var currentUser = undefined; // Declare variable for currentUser
  
  // Handle form submission for login
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Check if User exists, and check if username and password match
    for (let i = 0; i < objLoad.length; i++) {
      console.log(objLoad[i].email);

      // If user exists and credentials match, navigate
      // to view profile and pass user information
      if(data.get('email') === objLoad[i].email &&
          data.get('password') === objLoad[i].password) { 
        currentUser = objLoad[i];
        const userState = JSON.stringify(currentUser);
        navigate('/profile', { state: { user: userState } });
      } 
    };

    // Credentials coud not be found, update credential state variable
    // and dispaly message to UI
    setInvalidEmail(true);
    return;
  };

  // ---------------------------------
  // Debugging
  //
  const getLocalStorage = () => {
    const getUser = localStorage.getItem("users");
    console.log(getUser);
    const obj = JSON.parse(localStorage.getItem('users') || '{}');
    console.log("here's the parsed object:");
    console.log(obj);
    console.log(obj.email);
  }
  // ---------------------------------

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {invalidEmail &&
              <center>
                <span style={{color:'red', fontSize: '12px'}}>
                  Invalid Credentials, Please Try Again
                </span>
              </center>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={getLocalStorage}
            >
              get local storage
            </Button>

            <Grid container>
              <Grid item>
                <Link component={ RouterLink } to="/signup" variant="body2">
                  {"Don't have an account? Create Profile"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
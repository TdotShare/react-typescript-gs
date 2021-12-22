import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { systemConfig } from '../../config/System';
import { useHistory } from 'react-router';
import { routerPathProtected } from '../../router/RouterPath';


import { RootState } from './../../store/ConfigureStore'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginSuccess, addUser } from '../../store/reducer/User'
import swal from "../../utils/swal"
import axios from 'axios';
import { TAPIdata } from '../../model/User';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: "'Mitr', sans-serif;",
  },
  palette: {
    primary: {
      light: '#af52bf',
      main: '#9c27b0',
      dark: '#6d1b7b',
    },
    secondary :{
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
    }
  },
});

export default function Login() {

  const history = useHistory()

  const authen = useSelector((state: RootState) => state.user.auth)

  const dispatch = useDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('username'),
    //   password: data.get('password'),
    // });

    if (data.get('username') === "" && data.get('password') === "") {
      swal.actionInfo("กรุณากรอกข้อมูลให้ครบ !")
      return
    }

    //const postData = { "username": data.get('username'), "password": data.get('password') };

    axios.post<TAPIdata>(`${systemConfig.API}/auth/login`, {
      "username": data.get('username'),
      "password": data.get('password')
    }).then(res => {
      if (res.data.bypass) {

        dispatch(addUser({
          email: res.data.data.email,
          username: res.data.data.username,
          fullname: `${res.data.data.firstname} ${res.data.data.surname}`,
          token: `${res.data.data.token}`
        }))
        dispatch(setLoginSuccess())

      }else{
        swal.actionInfo("ไม่พบผู้ใช้งานระบบ กรุณกรอกข้อมูลใหม่อีกครั้ง !")
      }

    }).catch(err => {
      swal.actionError()
      console.error(err);
    })


    //history.replace(routerPathProtected.Dashboard)
  };

  React.useEffect(() => {

    if (authen) {
      history.replace(routerPathProtected.Dashboard)
    }

  }, [dispatch, authen, history])

  return (
    <ThemeProvider theme={theme}>
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
            {systemConfig.NameFull}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
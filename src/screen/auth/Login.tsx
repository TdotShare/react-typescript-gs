import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
//import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { systemConfig } from '../../config/System';
import { useHistory } from 'react-router';
import { routerPathProtected } from '../../router/RouterPath';


//import { RootState } from './../../store/ConfigureStore'
import {  useDispatch } from 'react-redux'
import { setLoginSuccess, addUser } from '../../store/reducer/User'
import swal from "../../utils/swal"
import axios from 'axios';
import { TAPIdata } from '../../model/User';
import { exportedColor } from '../../utils/color';

//import { Link } from "react-router-dom";


const theme = createTheme({
  palette: exportedColor,
  typography: {
    fontFamily: "'Mitr', sans-serif;",
  }
});

export default function Login() {

  const history = useHistory()

  const dispatch = useDispatch()

  const actionLoginRmuti = async () => {

    const data = await axios.get<TAPIdata>(`${systemConfig.API}/auth/login_rmuti`);

    if (data.data.bypass) {

      dispatch(addUser({
        email: data.data.data.email,
        username: data.data.data.username,
        fullname: `${data.data.data.firstname} ${data.data.data.surname}`,
        token: `${data.data.data.token}`
      }))
      dispatch(setLoginSuccess())

      history.replace(routerPathProtected.Dashboard)

    }else{
      if(data.data.message !== ""){
        swal.actionInfo(data.data.message)
      }
    }

  }

  React.useEffect(() => {

    actionLoginRmuti()

    // eslint-disable-next-line
  }, [])

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
          <div style={{ marginBottom: '2%' }}></div>
          <Typography component="h1" variant="h6">
            สถาบันวิจัยและพัฒนา มทร.อีสาน
          </Typography>

          <Link href="https://mis-ird.rmuti.ac.th/sso/auth/login?url=https://mis-ird.rmuti.ac.th/gs/admin/" >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN RMUTI
            </Button>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
//import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
//import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Breadcrumbs } from '@mui/material';
import { routerPathPublic } from '../router/RouterPath';
import {
  Link,
  useHistory
} from "react-router-dom";
import { RootState } from './../store/ConfigureStore'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginfail, deleteUser } from './../store/reducer/User'

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {

  const history = useHistory()

  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.item)
  const titleheader = useSelector((state: RootState) => state.titleheader.value)

  const { onDrawerToggle } = props;

  const dispatch = useDispatch()

  const actionLogout = () => {
    dispatch(setLoginfail())
    dispatch(deleteUser())
    history.replace(routerPathPublic.Login)
  }

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Typography
                onClick={() => actionLogout()}
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}

              >
                Logout
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src={`${process.env.PUBLIC_URL}/assets/images/mock/administrator.png`} alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {titleheader}
              </Typography>
            </Grid>
            <Grid item>
              <Breadcrumbs style={{ color: lightColor }} aria-label="breadcrumb">
                {breadcrumbs.map(({ active, value, link }, index) => (
                  active ?
                    <Typography key={index} color="inherit" sx={{
                      textDecoration: 'none',
                      color: 'common.white'
                    }}  >{value}</Typography>
                    :
                      
                    <Link  style={{ textDecoration: 'none' }} key={index} to={link} ><Typography
                        sx={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          color: lightColor,
                          '&:hover': {
                            color: 'common.white',
                          },
                        }}
                      >
                        {value}
                      </Typography></Link>
                
                ))}
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          {/* <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab label="Templates" />
          <Tab label="Usage" /> */}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}
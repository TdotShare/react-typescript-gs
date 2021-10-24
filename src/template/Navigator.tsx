import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import StarsIcon from '@mui/icons-material/Stars';
import { Avatar } from '@mui/material';
import { systemConfig } from '../config/System';
import {
  Link,
  useLocation
} from "react-router-dom";
import { useSelector  } from 'react-redux'

import { RootState } from './../store/ConfigureStore'
import  { routerPathProtected } from '../router/RouterPath'

// const categories = [
//   {
//     id: 'บริการของเรา',
//     children: [
//       { id: 'Authentication', icon: <PeopleIcon />, active: true },
//       { id: 'Database', icon: <DnsRoundedIcon /> },
//       { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
//       { id: 'Hosting', icon: <PublicIcon /> },
//       { id: 'Functions', icon: <SettingsEthernetIcon /> },
//       { id: 'Machine learning', icon: <SettingsInputComponentIcon />, }
//     ],
//   },
//   {
//     id: 'Admin',
//     children: [
//       { id: 'Analytics', icon: <SettingsIcon /> },
//       { id: 'Performance', icon: <TimerIcon /> },
//       { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
//     ],
//   },
// ];

const categories = [
  {
    id: 'บริการสำหรับเจ้าหน้าที่',
    children: [
      { id: 'ภาพรวมระบบ', icon: <HomeIcon /> , link : routerPathProtected.Dashboard },
      { id: 'โปรไฟล์ G - Scholar', icon: <PeopleIcon /> , link : routerPathProtected.User  },
      { id: 'G - Scholar Index', icon: <StarsIcon /> , link : routerPathProtected.Gsindex  },
      { id: 'มหาวิทยาลัย', icon: <MapsHomeWorkIcon /> , link : routerPathProtected.University  },
    ],
  },
];


const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  const location = useLocation();

  const user = useSelector((state: RootState) => state.user.data)

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          <ListItemIcon>
            <Avatar src={`${process.env.PUBLIC_URL}/assets/images/logo/irdrmuti_cri.png`} alt="My Avatar" />
          </ListItemIcon>
          {systemConfig.NameInit}
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <Avatar src={`${process.env.PUBLIC_URL}/assets/images/mock/profile.png`} alt="My Avatar" />
          </ListItemIcon>
          <ListItemText>{user.fullname}</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon , link }) => (
              <Link to={link} key={childId} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding >
                  <ListItemButton selected={splitLocation.includes(link.slice(1, link.length)) ? true : false} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText > {childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
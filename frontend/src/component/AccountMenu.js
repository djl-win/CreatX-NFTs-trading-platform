import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { storageUtils } from '../utils/storageUtils';
import { Link } from 'react-router-dom';


export default function AccountMenu() {
  const avator = localStorage.getItem('avator');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  //Determine if user have the wallet and open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // make axios post request
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={avator} sx={{ width: 50, height: 50 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          component={Link} to={localStorage.getItem('walletsJudge') || ''}
        >
          Wallet
        </MenuItem>
        <MenuItem
          component={Link} to='/profile/nfts'>
          NFTs
        </MenuItem>
        <MenuItem
          component={Link} to='/profile/follows'
        >
          Follws
        </MenuItem>
        <MenuItem
          component={Link} to='/profile/order'
        >
          Order
        </MenuItem>

        <Divider />


        <MenuItem
          // Cross-domain to 8080, the front and back ends are not on the same server
          onClick={() => { window.location.href = "http://localhost:8080/5620/pages/mIndex.html"; 
          storageUtils.removeUser(); 
          localStorage.removeItem('walletsJudge');
          localStorage.removeItem('avator'); }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

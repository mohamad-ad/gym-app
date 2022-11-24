import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { logout } from "../redux/userSlice";
import {useDispatch} from 'react-redux';


export default function UserMenu({ username }) {
    const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ()=>{
    setAnchorEl(null);
    dispatch(logout());
  }

  return (
    <div>
      
      <Stack

        direction={'row'}
        alignItems='center'
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
        textTransform={'capitalize'}
          sx={{
              p: "5px 10px",
            }}
        >
          {username?.split(' ')[0]}
        </Typography>
        <Avatar sx={{width:'35px', height:'35px'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Stack>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={ handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

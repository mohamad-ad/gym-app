import React, { memo, useContext } from "react";
import DrawerContext from "../../context/DrawerContext";
import ModalContext from "../../context/ModalContext";
import ModeContext from "../../context/ModeContext";
import RightDrawerItem from "./RightDrawerItem";
import { logout, userSelector } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import HomeIcon from "@mui/icons-material/Home";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LogoutIcon from "@mui/icons-material/Logout";

const listItems = [
  { title: "Home", icon: <HomeIcon />, link: "/" },
  { title: "Exercises", icon: <SportsGymnasticsIcon />, link: "/exercises" },
  { title: "About Us", icon: <InfoIcon />, link: "/about" },
];

const RightDrawer = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { mode, setMode } = useContext(ModeContext);
  const { setOpenModal } = useContext(ModalContext);
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const handleLoginClick = () => {
    setOpenModal(true);
    setOpenDrawer(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SwipeableDrawer
      onOpen={() => setOpenDrawer(true)}
      onClose={() => setOpenDrawer(false)}
      anchor={"right"}
      open={openDrawer}
    >
      <List sx={{ width: "250px" }}>
        <ListItem disablePadding sx={{p:'5px', display: "flex", justifyContent: "space-between" }}>
          {user.isLogedin ? (
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  sx={{ width: "35px", height: "35px" }}
                  alt="Remy Sharp"
                />
              </ListItemIcon>
              <ListItemText
                sx={{ textTransform: "capitalize", fontSize:'15px' }}
                primary={user.userInfo.username}
              />
            </ListItemButton>
          ) : (
            <IconButton onClick={handleLoginClick}>
              <PersonIcon sx={{ color: "text.primary" }} />
            </IconButton>
          )}

          <IconButton
            onClick={() => {
              setMode((mode) => (mode === "dark" ? "light" : "dark"));
              setOpenDrawer(false);
            }}
          >
            {mode === "dark" ? <ModeNightIcon /> : <WbSunnyIcon />}
          </IconButton>
        </ListItem>
        {user.isLogedin && <ListItem disablePadding></ListItem>}

        <Divider variant="middle" />

        {listItems.map((item, index) => (
          <RightDrawerItem key={index} item={item} />
        ))}

        {user.isLogedin && (
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </SwipeableDrawer>
  );
};

export default memo(RightDrawer);

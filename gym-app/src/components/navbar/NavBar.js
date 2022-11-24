import React, { memo, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DrawerContext from "../../context/DrawerContext";
import ModalContext from "../../context/ModalContext";
import ModeContext from "../../context/ModeContext";
import { userSelector } from "../../redux/userSlice";
import FormModal from "../FormModal";
import SearchBox from "./SearchBox";
import UserMenu from "../UserMenu";

import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import RightDrawer from "../drawer/RightDrawer";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import PersonIcon from "@mui/icons-material/Person";



const NavBar = () => {
  const { mode, setMode } = useContext(ModeContext);
  const { setOpenModal } = useContext(ModalContext);
  const { setOpenDrawer } = useContext(DrawerContext);

  const user = useSelector(userSelector);
  console.log("navbar");
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "favorites", link: "/fav" },
    { title: "About Us", link: "/" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "background.paper", color: "text.primary" }}
      >
        <Toolbar>
          <Stack
            width="100%"
            direction={"row"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <FitnessCenter />

            <Stack
              direction={"row"}
              sx={{
                alignContent: "center",
                justifyContent: {
                  xs: "space-between",
                  sm: "center",
                  md: "flex-start",
                },
                ml: { xs: 0, md: 5 },
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
              }}
              spacing={4}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  style={{ textDecoration: "none", color: "#fff" }}
                  to={item.link}
                >
                  <Typography width="100%" sx={{ color: "text.primary" }}>
                    {item.title}
                  </Typography>{" "}
                </Link>
              ))}
            </Stack>

            <SearchBox />

            <IconButton
              onClick={() =>
                setMode((mode) => (mode === "dark" ? "light" : "dark"))
              }
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {mode === "dark" ? (
                <ModeNightIcon
                  sx={{ display: "block", color: "text.primary" }}
                />
              ) : (
                <WbSunnyIcon sx={{ display: "block", color: "text.primary" }} />
              )}
            </IconButton>

            <MenuIcon
              sx={{
                display: { xs: "block", sm: "none" },
                cursor: "pointer",
                color: "text.primary",
              }}
              onClick={() => setOpenDrawer(true)}
            />
            <Stack
              sx={{ display: { xs: "none", sm: "flex" } }}
              alignItems="center"
              direction="row"
            >
              {user.isLogedin ? (
                <UserMenu username={user.userInfo.username} />
              ) : (
                <IconButton
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <PersonIcon sx={{ color: "text.primary" }} />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <RightDrawer />
      <FormModal />
    </>
  );
};

export default memo(NavBar);

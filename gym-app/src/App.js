import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";
import ModeContext from "./context/ModeContext";
import ModalContext from "./context/ModalContext";
import DrawerContext from "./context/DrawerContext";
import HaveAccountContext from "./context/HaveAccountContext";
import "./App.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  const [mode, setMode] = useState("light");
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [haveAccount, setHaveAccount] = useState(false);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <HaveAccountContext.Provider value={{ haveAccount, setHaveAccount }}>
        <ModalContext.Provider value={{ openModal, setOpenModal }}>
          <ModeContext.Provider value={{ mode, setMode }}>
            <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fav" element={<Favorites />} />
                  </Routes>
                </BrowserRouter>
              </ThemeProvider>
            </DrawerContext.Provider>
          </ModeContext.Provider>
        </ModalContext.Provider>
      </HaveAccountContext.Provider>
    </>
  );
}

export default App;

import React, { memo } from "react";
import BodyPartsMenu from "../../components/bodyPartsMenu/BodyPartsMenu";
import Exercises from "../../components/exercisesMenu/Exercises";
import Hero from "./Hero";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Box width="90%" m={"30px auto"}>
        <BodyPartsMenu />
        <Exercises />
      </Box>
    </Box>
  );
};

export default memo(Home);

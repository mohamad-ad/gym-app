import { Box, Button, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import heroImg from "../../assets/images/6.jpg";

const HeroContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundImage: `url(${heroImg})`,
  height: "500px",
  border:'1px solid',
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "40%",
  height: "300px",
  opacity: "0.8",
  margin: "50px 0 0 50px",
  [theme.breakpoints.down("md")]: {
    width: "50%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    margin: "auto",
  },
}));

const PaperContentWrapper = styled(Stack)(({ theme }) => ({
  height: "100%",
  flexDirection: "column",
  padding: "50px",
  justifyContent: "space-between",
}));

const PaperButton = styled(Button)(({ theme }) => ({
  alignSelf: "center",
  padding: "10px 100px",
  borderColor: theme.palette.text.primary,
  color: theme.palette.text.primary,
  "&:hover": {
    borderColor: theme.palette.text.primary,
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.paper,
  },
}));

const Hero = () => {
  return (
    <HeroContainer>
      <StyledPaper elevation={5}>
        <PaperContentWrapper>
          <Typography variant="h4">Title</Typography>
          <Typography variant="h6" textTransform={"capitalize"}>
            some text
          </Typography>
          <PaperButton variant="outlined">Button</PaperButton>
        </PaperContentWrapper>
      </StyledPaper>
    </HeroContainer>
  );
};

export default Hero;

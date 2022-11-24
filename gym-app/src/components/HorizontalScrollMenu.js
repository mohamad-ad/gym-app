import React, { useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { IconButton } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";



function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <IconButton
      onClick={() => scrollPrev()}
      sx={{
        height: "40px",
        width: "40px",
        alignSelf: "center",
        mr: { xs: "0px", md: "10px" },
      }}
    >
      <ArrowBack sx={{ alignSelf: "center" }} disabled={isFirstItemVisible} />
    </IconButton>
  );
}

function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <IconButton
      onClick={() => scrollNext()}
      sx={{
        height: "40px",
        width: "40px",
        alignSelf: "center",
        ml: { xs: "0px", md: "10px" },
      }}
    >
      <ArrowForward />
    </IconButton>
  );
}

const HorizontalScrollMenu = ({ items, Component }) => {
  const [selected, setSelected] = useState("all");
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.length > 0
        ? items.map((item, index) => {
            return selected === item ? (
              <Component
              key={index}
                selected={true}
                setSelected={setSelected}
                item={item}
                index={index}
              />
            ) : (
              <Component
              key={index}
                selected={false}
                setSelected={setSelected}
                item={item}
                index={index}
              />
            );
          })
        : Array(10)
            .fill(0)
            .map((item, index) => <Component key={index} index={index} />)}
    </ScrollMenu>
  );
};

export default HorizontalScrollMenu;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";


const RightDrawerItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <ListItem
        key={item.title}
        disablePadding
        onClick={() => navigate(item.link)}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" />
    </Box>
  );
};

export default RightDrawerItem;

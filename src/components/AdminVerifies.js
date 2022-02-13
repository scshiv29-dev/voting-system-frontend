import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Link from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { isAuthenticated } from "../auth/helper";

import { getUser } from "./dashboards/helper/userapicalls";
export default function AdminVerifies() {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const userLeftSide = () => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "commom.white",
          color: "info.main",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href={`admin/view/verifications`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Verify Applications" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <Divider orientation="vertical" flexItem />
      </Box>
    );
  };
  return (
    <div>
      <Menu></Menu>
      {userLeftSide()}
    </div>
  );
}

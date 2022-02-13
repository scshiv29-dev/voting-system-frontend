import React, { useState, useEffect } from "react";
import Menu from "../Menu";
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
import { isAuthenticated } from "../../auth/helper";

import { getUser } from "./helper/userapicalls";

const UserDashboard = () => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [values, setValues] = useState({
    getRedirect: false,
    name: "",
    email: "",
    phone: "",
  });

  const { name, email, phone } = values;

  const preload = (userId) => {
    getUser(userId, token).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.eror });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }
    });
  };
  useEffect(() => {
    preload(userId);
  }, []);

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
              <ListItemButton component="a" href={`/user/${userId}`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <Divider orientation="vertical" flexItem />
      </Box>
    );
  };
  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header ">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2 text-light">Name:</span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2 text-light">Email:</span>{" "}
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2 text-light">Phone:</span>{" "}
            {phone}
          </li>
          <li className="list-group-item">
            <span className="badge bg-info mr-2 text-light">User Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex">
      <Menu></Menu>
      {userLeftSide()}
      <div className="flex">{userRightSide()}</div>
    </div>
  );
};

export default UserDashboard;

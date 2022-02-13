import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ballotaddress } from "../config";
import Ballot from "../Ballot.json";

const MediaCard = ({
  title = "My Title",
  description = "My Description",
  value,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default MediaCard;

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "@material-ui/core";

import Menu from "./Menu";
import { isAuthenticated } from "../auth/helper";
import { createVerification } from "./dashboards/helper/verificationapicalls";

export default function Verification() {
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const user = isAuthenticated() && isAuthenticated().user;
  const [values, setValues] = useState({
    name: user.name,
    voterid: "",
    pan: "",
    aadhar: "",
    address: "",
    error: "",
    success: "",
    ethaddress: "",
  });

  const { name, voterid, pan, aadhar, address, error, success, ethaddress } =
    values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const verificationData = {
    fullname: name,
    voterid: voterid,
    pan: pan,
    adhaar: aadhar,
    address: address,
    ethaddress: ethaddress,
  };
  const onSubmit = (event) => {
    event.preventDefault();
    createVerification(userId, token, verificationData)
      .then((data) => {
        setValues({
          ...values,
          success: true,
          name: "",
          voterid: "",
          pan: "",
          aadhar: "",
          address: "",
          ethaddress: "",
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const verificationForm = () => {
    return (
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="n1" variant="h5">
              Submit Information to verify
            </Typography>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                autoFocus
                onChange={handleChange("name")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="VoterID"
                label="VoterID"
                autoComplete="VoterID"
                autoFocus
                onChange={handleChange("voterid")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="aadhaar"
                label="Aadhaar Number"
                autoComplete="Aadhaar Number"
                autoFocus
                onChange={handleChange("aadhar")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="pan"
                label="Pan Card"
                autoComplete="Pan Card"
                autoFocus
                onChange={handleChange("pan")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="EVM address"
                autoComplete="EVM address"
                autoFocus
                onChange={handleChange("ethaddress")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                autoComplete="Address"
                autoFocus
                onChange={handleChange("address")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {values.name}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Your Verification Request Was sent wait for confirmation.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Menu></Menu>
      {successMessage()}
      {errorMessage()}
      {verificationForm()}
    </div>
  );
}

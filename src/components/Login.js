import React, { useState } from "react";
import { app } from "../firebase/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Login = () => {
  // Inputs
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    const appverifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mynumber, appverifier)
      .then((result) => {
        setfinal(result);
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        alert("Login Successful");
        window.location.href = "/verify";
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <center>
        <div style={{ display: !show ? "block" : "none" }}>
          <TextField
            id="standard-basic"
            label="Enter Mobile Number"
            variant="standard"
            value={mynumber}
            onChange={(e) => {
              setnumber(e.target.value);
            }}
          />
          <br />
          <br />
          <div id="recaptcha-container"></div>
          <Button variant="contained" onClick={signin}>
            Send OTP
          </Button>
        </div>
        <div style={{ display: show ? "block" : "none" }}>
          <TextField
            id="standard-basic"
            label="Enter OTP"
            variant="standard"
            value={otp}
            onChange={(e) => {
              setotp(e.target.value);
            }}
          />
          <br />
          <br />
          <Button variant="contained" onClick={ValidateOtp}>
            Verify Otp
          </Button>
        </div>
      </center>
    </div>
  );
};

export default Login;

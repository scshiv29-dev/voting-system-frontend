import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Vote from "./components/Vote";
import Verification from "./components/Verification";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AdminVerifies from "./components/AdminVerifies";
import UserDashboard from "./components/dashboards/UserDashBoard";
import EditUser from "./components/dashboards/EditUser";
import ViewAllVerifications from "./components/ViewAllVerifications";
import ViewVerification from "./components/ViewVerification";
import Results from "./components/Results";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="vote" element={<Vote />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="verify" element={<Verification />} />
      <Route path="admin/dashboard" element={<AdminVerifies />} />
      <Route path="user/dashboard" element={<UserDashboard />} />
      <Route path="user/:userId" element={<EditUser />} />
      <Route
        path="admin/admin/view/verifications"
        element={<ViewAllVerifications />}
      />
      <Route
        path="verification/:verificationid"
        element={<ViewVerification />}
      />
      <Route path="results" element={<Results />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

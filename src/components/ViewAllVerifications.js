import React from "react";
import Menu from "./Menu";
import { isAuthenticated } from "../auth/helper";
import { getAllverifications } from "./dashboards/helper/verificationapicalls";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ViewAllVerifications() {
  const [values, setValues] = useState({
    verifications: [],
    error: false,
  });
  const { verifications, error } = values;
  const { user, token } = isAuthenticated();
  const preload = (userId) => {
    getAllverifications(userId, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true });
        } else {
          setValues({ ...values, verifications: data, error: false });
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(user._id);
  }, []);
  return (
    <div>
      <Menu></Menu>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Verification ID</th>
            <th>Full Name</th>
            <th>Aadhar</th>
            <th>Pan</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {verifications.map((verification, index) => (
            <tr key={index}>
              <td>{verification._id}</td>
              <td>{verification.fullname}</td>
              <td>{verification.adhaar}</td>
              <td>{verification.pan}</td>
              <td>{verification.status}</td>
              <td>
                <Link
                  className="btn btn-outline-warning"
                  to={`/verification/${verification._id}`}
                >
                  View Verification
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

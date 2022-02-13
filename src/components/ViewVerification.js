import React from "react";
import Menu from "./Menu";
import { isAuthenticated } from "../auth/helper";
import {
  getVerification,
  giveVotingRight,
  updateStatus,
} from "./dashboards/helper/verificationapicalls";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Verification from "./Verification";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ballotaddress } from "../config";
import Ballot from "../Ballot.json";

const ViewVerification = ({ match }) => {
  const { verificationid } = useParams();

  const [value, setValue] = useState({
    verification: [],
    status: "",
    reload: false,
    error: false,
  });

  const { verification, error, status, reload } = value;
  const { user, token } = isAuthenticated();
  const approve = () => {
    giveVotingRight(user._id, token, verification.user)
      .then((data) => {
        if (!data) {
          console.log(data.error);
        } else {
          alert("Approved");
        }
      })
      .catch((err) => console.log(err));
  };
  const preload = (vId) => {
    getVerification(user._id, token, vId)
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: true });
        } else {
          setValue({ ...value, verification: data, error: false });
          console.log(data.user);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preload(verificationid);
  }, [verificationid]);

  const handleChange = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };
  const changeStatus = () => {
    updateStatus(user._id, token, verificationid, status)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    setValue({ ...value, reload: value.reload + 1 });
  };

  async function giveVotingRightsOnChain() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(ballotaddress, Ballot.abi, signer);
    let data = await contract.giveRightToVote(verification.ethaddress);
    await data.wait();
    console.log(data);
  }
  return (
    <div>
      <Menu></Menu>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{verification.fullname}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{verification.address}</td>
          </tr>

          <tr>
            <td>Pan</td>
            <td>{verification.pan}</td>
          </tr>

          <tr>
            <td>Aadhar</td>
            <td>{verification.adhaar}</td>
          </tr>

          <tr>
            <td>Eth address</td>
            <td>{verification.ethaddress}</td>
          </tr>

          <tr>
            <td>User</td>
            <td>{verification.user}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{verification.status}</td>
          </tr>

          <tr>
            <td className="text-light">Update Status</td>
            <td>
              <select name="stats" id="stats" onChange={handleChange("status")}>
                <option>Select</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
              <button
                className="btn btn-outline-warning"
                onClick={changeStatus}
              >
                Update
              </button>
            </td>
          </tr>
          <tr>
            <td>Give Rights on Chain</td>
            <td>
              <button
                className="btn btn-outline-warning"
                onClick={giveVotingRightsOnChain}
              >
                Give Voting Rights on Chain
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewVerification;

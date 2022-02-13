import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ballotaddress } from "../config";
import Ballot from "../Ballot.json";
import Menu from "./Menu";
import MediaCard from "./Mediacard";

export default function Results() {
  const [winningProposal, setWinningProposal] = useState("");

  useEffect(() => {
    getWinningProposal();
  }, []);
  async function getWinningProposal() {
    const provider = new ethers.providers.JsonRpcProvider();
    let contract = new ethers.Contract(ballotaddress, Ballot.abi, provider);
    const data = await contract.winnerName();

    setWinningProposal(data);
  }
  return (
    <div>
      <Menu></Menu>
      <h1>Winning Proposal :{JSON.stringify(winningProposal)}</h1>
    </div>
  );
}

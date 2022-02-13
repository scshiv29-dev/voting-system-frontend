import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ballotaddress } from "../config";
import Ballot from "../Ballot.json";
import Menu from "./Menu";
import MediaCard from "./Mediacard";

export default function Vote() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    getCandidates();
  }, []);
  async function getCandidates() {
    const provider = new ethers.providers.JsonRpcProvider();
    let contract = new ethers.Contract(ballotaddress, Ballot.abi, provider);
    const data = await contract.viewAllCadidates();
    const names = await Promise.all(
      data.map(async (i) => {
        const Cname = i.name;
        return Cname;
      })
    );
    setProposals(names);
  }
  async function giveVote(value) {
    console.log(value);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(ballotaddress, Ballot.abi, signer);
    let data = await contract.vote(value);
    await data.wait();
    console.log(data);
  }
  return (
    <div>
      <Menu></Menu>
      <h1>Cast your votes</h1>
      {proposals.map((i, index) => {
        return (
          <div>
            <MediaCard title={i} description="" value={index}></MediaCard>
            <button
              className="btn btn-outline-success"
              onClick={() => giveVote(index)}
            >
              Vote
            </button>
          </div>
        );
      })}
    </div>
  );
}

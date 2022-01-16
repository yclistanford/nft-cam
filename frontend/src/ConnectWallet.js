import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { UserContext } from "./LoginContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Web3 from "web3";

const StyledButton = styled(Button)({
  color: "#ffd500",
  height: "55px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  backgroundColor: "#303030",
  borderColor: "#ffd500",
  border: "1px solid",
  "&:hover": {
    backgroundColor: "#a6a6a6",
  },
  "&:active": {
    backgroundColor: "#a6a6a6",
  },
});

export default function ConnectWallet() {
  const [user, setUser] = useContext(UserContext);
  const requestAssets = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.requestAccounts();
    console.log(accounts);
    const network = await web3.eth.net.getNetworkType().then(console.log);
    const openseaApi =
      network == "rikeby"
        ? "https://rinkeby-api.opensea.io/api/v1/assets?format=json&owner="
        : "https://api.opensea.io/api/v1/assets?format=json&owner=";
    const reqUrl = openseaApi + accounts[0];
    console.log(reqUrl);
    const response = await axios.get(reqUrl);
    console.log(response);
    setUser({ account: accounts[0], nfts: response.data.assets });
  };
  return (
    <StyledButton variant="contained" onClick={requestAssets}>
      {user
        ? "Connected! " + user.account
        : "Connect wallet to view your collection"}
    </StyledButton>
  );
}

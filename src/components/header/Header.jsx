import React, { createContext, useContext } from "react";
import * as nearAPI from "near-api-js";
import { NavLink } from "react-router-dom";
import TextTruncate from "react-text-truncate";

import { CHeaderToggler } from "@coreui/react";
// import { utils } from "ethers";

import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import {
  BoxArrowRight,
  CartPlus,
  ClockHistory,
  CloudUpload,
  GraphUpArrow,
  HouseFill
} from "react-bootstrap-icons";

import { Link } from "react-router-dom";

import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { useEffect, useState, useLayoutEffect } from "react";
import connectionConfig from "../../ConfigJson";
import { Button } from "@coreui/coreui";
import { connectButton } from '@rainbow-me/rainbowkit';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi';
import contractInterface from '../../erc20ABI.json';


const { keyStores, connect, WalletConnection, ConnectedWalletAccount, utils } =
  nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

export let accountt;

const Header = ({ openSideBar }) => {
  const [signedIn, setSignedIn] = useState("Connect Wallet");
  const [accountBalance, setAccountBalance] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);

  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    addessOrName: '0x7a104260aF4AD003a6A7F416c46aBF380d067808',
    contractInterface: contractInterface,
    functionName: 'mint'
  })

  const {data: mintData,  write: mint, isLoading: isMintLoading,  isSuccess: isMintStarted } = useContractWrite(config);

   const { isSuccess: txSuccess } = useWaitForTransaction({hash: mintData?.hash})

   const isMinted = isSuccess;

  useEffect(() => {
    const initializeProvider = async () => {
      try {
        // Initialize an Ethereum provider (e.g., MetaMask)
        if (window.ethereum) {
          const ethProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          setProvider(ethProvider);
          const accounts = await ethProvider.listAccounts();
          if (accounts.length > 0) {
            const address = accounts[0];
            setSignedIn(address);
            localStorage.setItem("account_id", address);

            // Initialize a signer for transactions
            const ethSigner = ethProvider.getSigner();
            setSigner(ethSigner);

            // Get the account balance
            const balance = await ethProvider.getBalance(address);
            setAccountBalance(ethers.utils.formatEther(balance));
          }
        }
      } catch (error) {
        console.error("Error connecting to Ethereum:", error);
      }
    };

    initializeProvider();
  }, []);

  const contractInstance = new ethers.Contract()
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0];
          setSignedIn(address);
          localStorage.setItem("account_id", address);

          // Initialize a signer for transactions
          const ethSigner = provider.getSigner();
          setSigner(ethSigner);

          // Get the account balance
          const balance = await provider.getBalance(address);
          setAccountBalance(ethers.utils.formatEther(balance));
        }
      }
    } catch (error) {
      console.error("Error connecting to Ethereum:", error);
    }
  };

  // const connectWallet = async () => {
  //   console.log("new function presed");
  //   const nearConnection = await connect(connectionConfig);
  //   const walletConnection = new WalletConnection(nearConnection);

  //   walletConnection.requestSignIn(
  //     "healthgo_admin_dashboard", // contract requesting access
  //     "Klosa Dashboard", // optional title
  //     "https://google.com", // optional redirect URL on success
  //     "localhost:3000" // optional redirect URL on failure
  //   );
  // };

  return (
    <Navbar
      className="bg-primary d-flex shadow-sm"
      fixed="top"
      style={{ display: "flex", height: "100px" }}
    >
      <Container fluid className="d-flex">
        <CHeaderToggler className="mr-5 hamburger" onClick={openSideBar}>
          <CIcon icon={cilHamburgerMenu} size="xl" />
        </CHeaderToggler>

        <Navbar.Brand>
          <Link to="/" className="link text-primary">
            <Image src={logo} />
            <p>Klosa Admin Dashboard</p>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" >
          {/* <div className="">
            <Image
              src={avatar}
              className="rounded-circle border-primary p-1"
              style={{ margin: "0px 10px 0px 0px " }}
            />
          </div> */}

          
          <div
            style={{ maxWidth: "200px", marginTop: "0px" }}
            className="signout"
            // onClick={async () => {
            //   const nearConnection = await connect(connectionConfig);
            //   const walletConnection = new WalletConnection(nearConnection);
            //   if (walletConnection.isSignedIn()) {
            //     localStorage.removeItem("account_id");
            //     walletConnection.signOut();
            //     setSignedIn("Connect Wallet");
            //   } else if (!walletConnection.isSignedIn()) {
            //     connectWallet();
            //   }
            // }}
          >
            {/* disabled={isMintLoading isMintStarted} */}
            {isConnected && (
            <div className="text-primary list" style={{ maxWidth: "300px", display:"inline-flex" }}>
              <TextTruncate
                line={1}
                element="span"
                truncateText="…"
                text={signedIn}
              />
              <BoxArrowRight size={20} />
            </div>
            )}
          </div>
          {/* <Navbar.Text
            className="text-primary"
            onClick={async () => {
              const nearConnection = await connect(connectionConfig);
              const walletConnection = new WalletConnection(nearConnection);
              if (walletConnection.isSignedIn()) {
                walletConnection.signOut();
                setSignedIn("Connect Wallet");
              } else if (!walletConnection.isSignedIn()) {
                connectWallet();
              }
            }}
          >
            <TextTruncate
              line={1}
              element="span"
              truncateText="…"
              text={signedIn}
              // textTruncateChild={<a href="#">Read on</a>}
              // maxCalculateTimes={30}
            />
          </Navbar.Text> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

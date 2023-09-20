import React, { createContext, useContext } from "react";
import * as nearAPI from "near-api-js";
import { NavLink } from "react-router-dom";
import TextTruncate from "react-text-truncate";

import { CHeaderToggler } from "@coreui/react";

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

const { keyStores, connect, WalletConnection, ConnectedWalletAccount, utils } =
  nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

export let accountt;

const Header = ({ openSideBar }) => {
  const [signedIn, setSignedIn] = useState("connect wallet");
  const [accountBalance, setAccountBalance] = useState(undefined);

  useEffect(() => {
    const signedUser = async () => {
      const nearConnection = await connect(connectionConfig);
      const walletConnection = new WalletConnection(nearConnection);
      setSignedIn(walletConnection.getAccountId() || "Connect Wallet");
      console.log(walletConnection.getAccountId());
      walletConnection.isSignedIn() &&
        localStorage.setItem(
          "account_id",
          `${walletConnection.getAccountId()}`
        );
      const account = await nearConnection.account(
        walletConnection.getAccountId()
      );

      console.log(
        utils.format.formatNearAmount(
          (await account.getAccountBalance()).available
        )
      );
      setAccountBalance(
        utils.format.formatNearAmount(
          (await account.getAccountBalance()).available
        )
      );
    };
    signedUser();
    // setSignedIn("Connect wallet");
  }, []);

  const connectWallet = async () => {
    console.log("new function presed");
    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(nearConnection);

    walletConnection.requestSignIn(
      "healthgo_admin_dashboard", // contract requesting access
      "HealthGo Dashboard", // optional title
      "https://google.com", // optional redirect URL on success
      "localhost:3000" // optional redirect URL on failure
    );
  };

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
            <p>HealthGo Admin Dashboard</p>
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
            onClick={async () => {
              const nearConnection = await connect(connectionConfig);
              const walletConnection = new WalletConnection(nearConnection);
              if (walletConnection.isSignedIn()) {
                localStorage.removeItem("account_id");
                walletConnection.signOut();
                setSignedIn("Connect Wallet");
              } else if (!walletConnection.isSignedIn()) {
                connectWallet();
              }
            }}
          >
            <div className="text-primary list" style={{ maxWidth: "300px", display:"inline-flex" }}>
              <TextTruncate
                line={1}
                element="span"
                truncateText="…"
                text={signedIn}
              />
              <BoxArrowRight size={20} />
            </div>
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

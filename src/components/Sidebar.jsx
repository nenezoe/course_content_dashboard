import React from "react";
import SimpleBar from "simplebar-react";

import { CSidebar, CSidebarNav } from "@coreui/react";
import {
  BoxArrowRight,
  CartPlus,
  ClockHistory,
  CloudUpload,
  GraphUpArrow,
  HouseFill
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// sidebar nav config

const Sidebar = ({ sideBar }) => {
  return (
    <div className="sideBar">
      <CSidebar className={sideBar ? "side-bar-open side-bar" : "side-bar"}>
        <CSidebarNav>
          <SimpleBar>
            <div className="mt-5 d-flex  flex-column">
              <Link className="link nav-item" to="/">
                <div className="text-primary list mb-4">
                  <HouseFill size={25} /> Home
                </div>
              </Link>
              <Link className="link nav-item" to="/product-upload">
                <div className="text-primary list mb-4">
                  <CartPlus size={25} /> Product Upload
                </div>
              </Link>
              <Link className="link nav-item" to="/upload/course">
                <div className="text-primary list mb-4">
                  <CloudUpload size={25} /> Category Upload
                </div>
              </Link>
              {/* <Link className="link nav-item" to="/history">
                <div className="text-primary list mb-4">
                  <ClockHistory size={25} /> History
                </div>
              </Link>
              <Link className="link nav-item" to="/analytics">
                <div className="text-primary list mb-4">
                  <GraphUpArrow size={25} /> Analytics
                </div>
              </Link> */}
            </div>
            {/* <div className="signout">
              <div className="text-primary list">
                <span className="mr-5">Log Out</span>
                <BoxArrowRight size={20} />
              </div>
            </div> */}
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default React.memo(Sidebar);

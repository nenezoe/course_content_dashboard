import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { useState } from "react";
import { Content, Sidebar, Footer, Header } from "./components/index";
import { initDB } from "react-indexed-db";
import { DBConfig } from "./DBConfig";

/* import Profile from '../../profile/Profile';
 */

initDB(DBConfig)

const App = () => {
  const [sideBar, setSideBar] = useState(false);

  function toggleSideBar() {
    if (sideBar == true) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
    console.log("clicked");
  }

  return (
    <BrowserRouter>
      <div className="">
        <Sidebar sideBar={sideBar} />
        <div className="d-flex flex-column min-vh-100">
          <Header openSideBar={toggleSideBar} />
          <div className={sideBar ? "content-sidebar " : "content"}>
            <Content />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from "react";
import "typeface-roboto";

import AppBar from "@material-ui/core/AppBar";
import { Switch, Route, Link } from "react-router-dom";

import ModeSelection from "./components/modeSelection";
import SinglePlayer from "./components/singlePlayer";
import PlayWithFriends from "./components/playWithFriends.jsx";
import NotFound from "./components/notFound";
import { getname } from "./auth.js"

function App() {
  const [auth, setAuth] = useState(null);
  if (auth === null) getname(setAuth);
  return (
    <React.Fragment>
      <AppBar color="primary" position="static"
        style={{ paddingLeft: "5%", width: "100%", marginBottom: 30 }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h1>keybored</h1>
        </Link>
      </AppBar>

      <div id="app">
        <Switch>
          <Route path="/play" render={() =>
            <SinglePlayer auth={auth} setAuth={auth => setAuth(auth)} />} />
          <Route path="/withfriends" render={() => <PlayWithFriends />} />

          <Route path="/" exact render={() => <ModeSelection />} />
          <Route path="/" render={() => <NotFound />} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;

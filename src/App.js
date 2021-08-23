// HOOKS IMPORTS
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

// CONTAINERS & COMPONENTS IMPORTS
import Home from "./containers/Home/Home";
import Game from "./containers/Game/Game";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import Header from "./components/Header/Header";

// ICONS IMPORTS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [value, setValue] = useState("");

  // FUNCTION TO CREATE A COOKIE CONTAINING THE USER'S TOKEN AND MODIFY THE STATE TO CHANGE THE HEADER
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 3,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  console.log("COOKIE ==>", userToken);

  return (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        setValue={setValue}
        value={value}
      />
      <Switch>
        <Route path="/user/signup">
          <Signup setUser={setUser} />
        </Route>

        <Route path="/user/login">
          <Login setUser={setUser} />
        </Route>

        <Route path="/games/:id">
          <Game />
        </Route>

        <Route path="/">
          <Home setValue={setValue} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

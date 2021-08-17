import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Header.css";

// Material UI
import { Button } from "@material-ui/core";
import { BackgroundColor } from "chalk";

const Header = ({ userToken, setUser, setValue }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return userToken ? (
    <div className="header-loggedin">
      <div className="logo">
        <Link to={"/"}>
          <img className="logo-img" src={logo} alt="logo" />
        </Link>
        <h2 className="logo-title">Gamepad</h2>
      </div>
      <div className="buttons-logged-in">
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            marginRight: "1vw",
          }}
        >
          My Collection
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }}>
          <span>Bryan</span>
          <img
            src="https://thispersondoesnotexist.com/image"
            className="user-pic"
            alt="user"
          />
        </Link>
        <Button
          className="signout-btn"
          variant="contained"
          color="secondary"
          style={{ textTransform: "none", background: "#ff4655" }}
          onClick={() => setUser(null)}
        >
          Sign out
        </Button>
      </div>
    </div>
  ) : (
    <div className="header">
      <div className="logo">
        <Link to={"/"}>
          <img className="logo-img" src={logo} alt="logo" />
        </Link>
        <h2 className="logo-title">Gamepad</h2>
      </div>
      <div className="buttons">
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontFamily: "Exo, sans-serif",
          }}
        >
          My Collection
        </Link>
        <Button
          variant="contained"
          color="secondary"
          style={{
            textTransform: "capitalize",
            background: "#ff4655",
            fontFamily: "Exo",
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Header;

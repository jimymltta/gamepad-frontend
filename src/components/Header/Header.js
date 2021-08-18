import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";

// Material UI
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";

const Header = ({ userToken, setUser, setValue }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          onClick={handleOpen}
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
        <Modal open={open} onClose={handleClose}>
          <div className="modal">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
              cum veritatis optio hic excepturi error corrupti consequatur
              magnam, sapiente nostrum doloremque aut ab totam quia ipsam natus
              eos fugiat sint?
            </p>
            <form action="">
              <input type="text" />
              <input type="text" />
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;

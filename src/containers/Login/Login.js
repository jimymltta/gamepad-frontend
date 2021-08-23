// HOOKS IMPORTS
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://gamepad-jm.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.token;

      if (token) {
        setUser(token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="login-main">
      <div className="login-infos">
        <h2>How it works ?</h2>
        <span>
          Log in to your free account to be able to get all features of Gamepad
        </span>
        <span>Add a game to your collection</span>
        <span>Leave a review for a game</span>
      </div>
      <div className="login-div">
        <h2>Log in</h2>
        <div className="login-form-div">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Email..."
              onChange={handleEmailChange}
            />
            <input
              type="text"
              placeholder="Password..."
              onChange={handlePasswordChange}
            />
            <button type="submit">Connexion</button>
            <Link
              to={"/user/signup"}
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Exo, sans-serif",
                fontSize: "12px",
              }}
            >
              Don't have an account yet?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

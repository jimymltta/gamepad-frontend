// HOOKS IMPORTS
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = ({ setUser }) => {
  // STATES
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  // FUNCTIONS TO HANDLE CHANGE & SUBMIT
  const handleNameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    console.log(email);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://gamepad-jm.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );

      const token = response.data.token;

      if (token) {
        setUsername(token);
        history.push("/");
      }
      console.log(handleSubmit);
    } catch (error) {
      console.log(error.message);
      if (error.message.status === 409) {
        setErrorMessage("This email is already used");
        console.log(error.response);
      }
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-infos">
        <h2>How it works ?</h2>
        <span>
          Log in to your free account to be able to get all features of Gamepad
        </span>
        <span>Add a game to your collection</span>
        <span>Leave a review for a game</span>
      </div>
      <div className="signup-div">
        <h2>Sign up</h2>
        <div className="form-div">
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              placeholder="Username"
              onChange={handleNameChange}
              className="long-input"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              className="long-input"
            />
            <div className="password-inputs">
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                className="short-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="short-input"
              />
            </div>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <button type="submit">Connexion</button>
            <Link
              to={"/user/login"}
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Exo, sans-serif",
                fontSize: "12px",
              }}
            >
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

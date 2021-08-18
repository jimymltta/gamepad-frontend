// HOOKS IMPORTS
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

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
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("urlexample.com/user/signup", {
        email: email,
        username: username,
        password: password,
      });

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
    <div className="form-div">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Username" onChange={handleNameChange} />
        <input type="text" placeholder="Email" onChange={handleEmailChange} />
        <input
          type="text"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input type="text" placeholder="Confirm Password" />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button type="submit">Connexion</button>
        <Link to={"/user/login"}>Already have an account?</Link>
      </form>
    </div>
  );
};

export default Signup;

// HOOKS IMPORTS
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

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

      const response = await axios.post("urlexample.com/user/login", {
        email: email,
        password: password,
      });

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
    <div className="form-div">
      <form action="">
        <h1>Log in</h1>
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
        <Link to={"/user/signup"}>Don't have an account yet?</Link>
      </form>
    </div>
  );
};

export default Login;

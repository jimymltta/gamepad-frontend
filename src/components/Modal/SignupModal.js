import axios from "axios";
import { useState } from "react";

const SignupModal = ({ open, setOpen, setUser, userToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (event) => {
    try {
      ErrorEvent.preventDefault();
      const response = await axios.post(`http://localhost:4000/user/signup`, {
        email: email,
        username: username,
        password: password,
      });
      setUser(response.data.token);
    } catch (error) {
      setErrorMessage(true);
      console.log(error.message);
    }
  };
};

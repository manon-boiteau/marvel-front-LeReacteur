// Import react-router-dom
import { Link, useHistory } from "react-router-dom";

// Import hooks from React
import { useState } from "react";

// Import Axios
import axios from "axios";

const Signup = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleName = (event) => {
    const result = event.target.value;
    setUserName(result);
  };

  const handleEmail = (event) => {
    const result = event.target.value;
    setEmail(result);
  };

  const handlePassword = (event) => {
    const result = event.target.value;
    setPassword(result);
  };

  // Local backend : "http://localhost:3001/user/signup"
  // Heroku backend : "https://mymarvel-lereacteur.herokuapp.com/user/signup"

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://mymarvel-lereacteur.herokuapp.com/user/signup",
          {
            username: userName,
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          const token = response.data.token;
          setUser(token);
          history.push("/");
        } else {
          setErrorMessage("An error occured ");
        }
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage("🤭 This email already exists.");
        }
      }
    };
    fetchData();
  };

  return (
    <main className="form wrapper">
      <div className="form wrapper">
        <h2>SIGNUP</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-form">
            <input type="text" placeholder="Username" onChange={handleName} />
            <input type="email" placeholder="Email" onChange={handleEmail} />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>

          <div>
            <input type="submit" value="SIGNUP" className="btn-red" />
            <span>{errorMessage}</span>
            <Link to="/login">You have already an account ? Let's go !</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;

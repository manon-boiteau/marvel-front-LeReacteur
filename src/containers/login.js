// Import react-router-dom
import { Link, useHistory } from "react-router-dom";

// Import hooks from React
import { useState } from "react";

// Import Axios
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleEmail = (event) => {
    const result = event.target.value;
    setEmail(result);
  };
  const handlePassword = (event) => {
    const result = event.target.value;
    setPassword(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Local backend : "http://localhost:3001/user/login"
    // Heroku backend : "https://mymarvel-lereacteur.herokuapp.com/user/login"

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://mymarvel-lereacteur.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response);
        if (response.data.token) {
          const token = response.data.token;
          setUser(token);

          history.push("/"); // user can enter - redirect to home page
        }
      } catch (error) {
        console.log("error ", error);
        if (error.response.status === 400) {
          setErrorMessage("⛔️ Email or password are wrong.");
        }
      }
    };
    fetchData();
  };

  return (
    <main className="form">
      <div className="form wrapper">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-form">
            <input type="email" placeholder="Email" onChange={handleEmail} />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
          <div>
            <input type="submit" value="LOGIN" className="btn-red" />
            <span>{errorMessage}</span>
            <Link to="/signup">
              Do you already have an account ? Signup here !
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

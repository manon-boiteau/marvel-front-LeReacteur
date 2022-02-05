import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Signup from "./containers/Signup";
import Login from "./containers/login";
import Comics from "./containers/Comics";
import Personnage from "./containers/Personnage";
import Personnages from "./containers/Personnages";
import NoMatch from "./containers/NoMatch";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner);

function App() {
  // Catch user's token in a cookie (or not)
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  // Characters page
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [count, setCount] = useState(0);
  // Search bar
  const [searchName, setSearchName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  /* ----- Characters page request ----- */
  // Local backend : `http://localhost:3001/characters?skip=${skip}&limit=${limit}&name=${searchName}`
  // Heroku backend : `https://mymarvel-lereacteur.herokuapp.com/characters?skip=${skip}&limit=${limit}&name=${searchName}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mymarvel-lereacteur.herokuapp.com/characters?skip=${skip}&limit=${limit}&name=${searchName}`
        );

        setData(response.data.results);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [skip, limit, searchName]);

  /* Cookies */
  const setUser = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("token");
      setUserToken(null);
    }
  };

  /* ----- Search bar filters ----- */
  const handleSearchName = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  };

  const handleSearchTitle = (event) => {
    event.preventDefault();
    setSearchTitle(event.target.value);
  };

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>

      <span>En cours de chargement...</span>
    </div>
  ) : (
    <Router>
      <Header
        handleSearchName={handleSearchName}
        handleSearchTitle={handleSearchTitle}
        userToken={userToken}
        setUser={setUser}
      />
      <Switch>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/comics">
          <Comics title={searchTitle} />
        </Route>
        <Route path="/personnage/:id">
          <Personnage />
        </Route>
        <Route exact path="/">
          <Personnages
            data={data}
            skip={skip}
            setSkip={setSkip}
            limit={limit}
          />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

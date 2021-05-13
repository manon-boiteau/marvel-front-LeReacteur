import "./App.css";

// React-router-dom - import
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Containers - import
import Comics from "./containers/Comics";
import Personnage from "./containers/Personnage";
import Personnages from "./containers/Personnages";

// Components - import
import Header from "./components/Header";

/* Import Fontawsome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/personnage/:id">
          <Personnage />
        </Route>
        <Route exact path="/">
          <Personnages />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// React-router-dom - import
import { Link } from "react-router-dom";

// Components - import
import Menu from "./Menu";

// Images - import
import marvelLogo from "../assets/img/marvel-logo.png";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <Link to="/">
          <img src={marvelLogo} alt="Marvel logo" />
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default Header;

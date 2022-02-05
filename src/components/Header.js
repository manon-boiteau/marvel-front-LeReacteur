import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import marvelLogo from "../assets/img/marvel-logo.png";

const Header = ({
  handleSearchName,
  handleSearchTitle,
  userToken,
  setUser,
}) => {
  let location = useLocation();

  return (
    <header>
      <div>
        <div className="header-head">
          <div>
            <Link to="/">
              <img src={marvelLogo} alt="Marvel logo" />
            </Link>
          </div>
        </div>

        <Menu userToken={userToken} setUser={setUser} />
        {/* Not the same search bar according to the page */}
        {location.pathname === "/" ? (
          <div className="characters-search-bar">
            <input
              type="text"
              placeholder="Archangel"
              onChange={handleSearchName}
            />
          </div>
        ) : location.pathname === "/comics" ? (
          <div className="characters-search-bar">
            <input
              type="text"
              placeholder="100th Anniversary Special (2014) #1"
              onChange={handleSearchTitle}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;

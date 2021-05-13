// React-router-dom - import
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <span>
        <Link to="/">Characters</Link>
      </span>
      <span>
        <Link to="/comics">Comics</Link>
      </span>
      <span>
        <Link to="/favourite">Favoris</Link>
      </span>
    </nav>
  );
};

export default Menu;

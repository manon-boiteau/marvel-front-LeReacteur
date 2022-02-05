import { Link } from "react-router-dom";

const Menu = ({ userToken, setUser }) => {
  return (
    <nav>
      <span>
        <Link to="/">Characters</Link>
      </span>
      <span>
        <Link to="/comics">Comics</Link>
      </span>
      {userToken ? (
        <button
          className="btn-red"
          onClick={() => {
            setUser(null);
          }}
        >
          SIGN OUT
        </button>
      ) : (
        <>
          <button>
            <Link to="/signup">SIGN UP</Link>
          </button>
          <button>
            <Link to="/login">LOGIN</Link>
          </button>
        </>
      )}
    </nav>
  );
};

export default Menu;

// Axios - import
import axios from "axios";

// Hooks from React
import { useState, useEffect } from "react";

// React-router-dom - import
import { Link } from "react-router-dom";

// FontAwesome icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Personnages = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Local backend : http://localhost:3001/characters
  // Heroku backend :

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/characters");

        const characters = response.data;
        setData(characters);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        {/* <FontAwesomeIcon icon="spinner" spin /> */}
      </span>

      <span>En cours de chargement...</span>
    </div>
  ) : (
    <main>
      <div className="characters-search-bar">
        {/* <FontAwesomeIcon icon="search" className="icon-search" /> */}
        <input type="search" placeholder="Archangel" />
      </div>
      <div className="characters-wrapper wrapper">
        {data.results.map((elem) => {
          return (
            <Link
              to={`/personnage/${elem._id}`}
              key={elem._id}
              className="characters-card"
            >
              {elem.thumbnail ? (
                <div className="characters-card-img">
                  <img
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt={elem.name}
                  />
                </div>
              ) : null}

              {elem.name ? <span>{elem.name}</span> : null}
              {elem.description ? <p>{elem.description}</p> : null}
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Personnages;

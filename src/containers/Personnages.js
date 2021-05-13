// Axios - import
import axios from "axios";

// Hooks from React
import { useState, useEffect } from "react";

// React-router-dom - import
import { Link } from "react-router-dom";

// Components - import
import SkipButtons from "../components/SkipButtons";

// FontAwesome icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Personnages = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [characters, setCharacters] = useState(0);
  const [result, setResult] = useState([]);

  // Local backend : http://localhost:3001/characters
  // Heroku backend :

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/characters?limit=${limit}&skip=${skip}`
        );

        setData(response.data);
        setCharacters(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [limit, skip]);

  const keyUp = (event) => {
    let results = [];
    for (let i = 0; i < data.results.length; i++) {
      if (
        data.results[i].name.indexOf(event.target.value.toLowerCase()) !== -1
      ) {
        if (results.length <= 100) {
          results.push(data.results[i]); // keep 100 results on page
        } else {
          break;
        }
      }
    }
    setResult(results);
    console.log("results ", results);
  };

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
        <input type="search" placeholder="Archangel" onKeyUp={keyUp} />
      </div>
      <SkipButtons skip={skip} setSkip={setSkip} limit={limit} />

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
              <div className="characters-card-details">
                {elem.name ? <span>{elem.name}</span> : null}
                {elem.description ? <p>{elem.description}</p> : null}
              </div>
            </Link>
          );
        })}
      </div>
      <SkipButtons skip={skip} setSkip={setSkip} limit={limit} />
    </main>
  );
};

export default Personnages;

// Hooks from React
import { useState, useEffect } from "react";

// Axios - import
import axios from "axios";

// FontAwesome icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Local backend : http://localhost:3001/comics
  // Heroku backend :

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/comics");

        const comics = response.data;
        setData(comics);
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
      <div className="comics-search-bar">
        {/* <FontAwesomeIcon icon="search" className="icon-search" /> */}
        <input
          type="search"
          placeholder="100th Anniversary Special (2014) #1"
        />
      </div>

      <div className="comics-wrapper wrapper">
        {data.results.map((elem) => {
          return (
            <div key={elem._id} className="comics-card">
              {elem.thumbnail ? (
                <div className="comics-card-img">
                  <img
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt={elem.title}
                  />
                </div>
              ) : null}

              {elem.title ? <span>{elem.title}</span> : null}
              {elem.description ? <p>{elem.description}</p> : null}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Comics;

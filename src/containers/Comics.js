// Hooks from React
import { useState, useEffect } from "react";

// Axios - import
import axios from "axios";

// Components - import
import SkipButtons from "../components/SkipButtons";

// FontAwesome icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [comics, setComics] = useState(0);

  // Local backend : http://localhost:3001/comics
  // Heroku backend :

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/comics?limit=${limit}&skip=${skip}`
        );

        setData(response.data);
        setComics(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [limit, skip]);

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
        <input
          type="search"
          placeholder="100th Anniversary Special (2014) #1"
        />
      </div>
      <SkipButtons skip={skip} setSkip={setSkip} limit={limit} />

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
              <div className="comics-card-details">
                {elem.title ? <span>{elem.title}</span> : null}
                {elem.description ? <p>{elem.description}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
      <SkipButtons skip={skip} setSkip={setSkip} limit={limit} />
    </main>
  );
};

export default Comics;

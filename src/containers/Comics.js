import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = ({ title, url }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [comics, setComics] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}comics?limit=${limit}&skip=${skip}&title=${title}`
        );
        setData(response.data.results);
        setComics(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [limit, skip, title]);

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>
      <span>En cours de chargement...</span>
    </div>
  ) : (
    <main>
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />

      <div className="comics-wrapper wrapper">
        {data.map((elem) => {
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
                {elem.description ? (
                  <p className="hidden">{elem.description}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />
    </main>
  );
};

export default Comics;

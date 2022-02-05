import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Personnage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  // Local backend : `http://localhost:3001/comics/${id}`
  // Heroku backend : `https://mymarvel-lereacteur.herokuapp.com/comics/${id}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mymarvel-lereacteur.herokuapp.com/comics/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>
      <span>En cours de chargement...</span>
    </div>
  ) : (
    <div className="wrapper character-bloc">
      <div className="character-bloc-1">
        {data.name ? <h2>{data.name}</h2> : null}
        {data.thumbnail ? (
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.name}
          />
        ) : null}
        {data.description ? <p>{data.description}</p> : null}
      </div>
      <div className="character-bloc-2">
        {data.comics.map((elem) => {
          return (
            <div className="character-bloc-2-comic">
              <div>
                {elem.title ? <span>{elem.title}</span> : null}
                {elem.description ? (
                  <p className="hidden">{elem.description}</p>
                ) : null}
              </div>
              {elem.thumbnail ? (
                <div>
                  <img
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt={elem.title}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Personnage;

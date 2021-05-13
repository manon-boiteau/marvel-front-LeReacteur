/* Import hooks from React */
import { useState, useEffect } from "react";

/* Import react-router-dom */
import { useParams } from "react-router-dom";

// Axios - import
import axios from "axios";

const Personnage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  // Local backend : http://localhost:3001/comics
  // Heroku backend :

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/comics/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
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
                {elem.description ? <p>{elem.description}</p> : null}
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

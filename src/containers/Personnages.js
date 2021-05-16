// React-router-dom - import
import { Link } from "react-router-dom";

// Components - import
import Pagination from "../components/Pagination";

const Personnages = ({ data, skip, setSkip, limit }) => {
  return (
    <main>
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />

      <div className="characters-wrapper wrapper">
        {data.map((elem) => {
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
                {elem.description ? (
                  <p className="hidden">{elem.description}</p>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />
    </main>
  );
};

export default Personnages;

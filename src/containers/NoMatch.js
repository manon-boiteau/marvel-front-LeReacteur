// Images - import
import notFound from "../assets/img/not-found.jpg";

const NoMatch = () => {
  return (
    <div className="not-found">
      <div className="not-found-img">
        <img src={notFound} alt="404 not found" />
      </div>

      <div className="not-found-details">
        <h1>404 PAGE NOT FOUND</h1>
        <p>
          Check that you typed the address correctly, go back to your previous
          page or try using our site search to find something specific.
        </p>
      </div>
    </div>
  );
};

export default NoMatch;

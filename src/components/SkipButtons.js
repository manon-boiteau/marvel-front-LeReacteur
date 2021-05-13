const SkipButtons = ({ skip, setSkip, limit }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          skip > 0 && setSkip(skip - limit);
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          setSkip(skip + limit);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default SkipButtons;

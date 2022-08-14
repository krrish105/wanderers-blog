import errorGif from '../404-error.gif';

const NotFoundPage = ({ error }) => {
  return (
    <main className="error-container">
      <img src={errorGif} alt="" />
      <div className="error-right-part">
        <div>Oops! The page you are looking for could not be found.</div>
        <a href="/">Back to Home</a>
      </div>
    </main>
  );
};

export default NotFoundPage;

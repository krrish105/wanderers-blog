import errorGif from '../assets/error.gif';

const ErrorPage = ({ error }) => {
  return (
    <main className="error-container">
      <img src={errorGif} alt="" />
      <div className="error-right-part">
        <div>Something went wrong, Try again later</div>
        <a href="/">Back to Home</a>
      </div>
    </main>
  );
};

export default ErrorPage;

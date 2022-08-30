import errorGif from '../assets/error.gif';

const ErrorPage = ({ error }) => {
  return (
    <main className="flex-center-content min-h-screen flex-col">
      <div className="error-container">
        <img src={errorGif} alt="" />
        <div className="error-right-part">
          <div>Something went wrong, Try again later</div>
          <a href="/">Back to Home</a>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;

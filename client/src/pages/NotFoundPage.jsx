import errorGif from '../assets/404-error.gif';
import { useEffect } from 'react';

const NotFoundPage = ({ error }) => {
  useEffect(() => {
    document.title = 'Not Found';
  }, []);

  return (
    <main className="flex-center-content min-h-screen flex-col">
      <div className="error-container">
        <img src={errorGif} alt="" />
        <div className="error-right-part">
          <div>Oops! The page you are looking for could not be found.</div>
          <a href="/">Back to Home</a>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;

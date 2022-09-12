import { useEffect } from 'react';

const Spinner = ({ display }) => {
  useEffect(() => {
    if (display) {
      document.documentElement.classList.add('backdrop');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [display]);
  return (
    <>
      <div className="spinner-backdrop absolute-fill"></div>
      <div className="absolute-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;

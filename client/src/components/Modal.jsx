import { useEffect } from 'react';

const Modal = ({ show = false, close, title, text, setResponse, confirm }) => {
  const cancelHandler = (e) => {
    setResponse(e.value);
    close(false);
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black opacity-[0.7]"></div>
      )}
      <div
        className={
          show
            ? 'block border bg-slate-700 p-10 z-[100] modal-container'
            : 'hidden'
        }
      >
        <div className="flex-justify-between">
          <h2>{title}</h2>
          <button onClick={() => close(false)}>X</button>
        </div>
        <div className="mt-5 text-xl">{text}</div>
        <div className="flex-justify-between mt-7">
          <button
            value="CONFIRM"
            onClick={confirm}
            className="border px-6 py-1"
          >
            Confirm
          </button>
          <button
            value="CANCEL"
            onClick={cancelHandler}
            className="border px-6 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;

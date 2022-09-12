import infoIcon from '../assets/info-icon.svg';
import errorIcon from '../assets/error-icon.svg';
import successIcon from '../assets/success-icon.svg';
import { useEffect } from 'react';

const Alert = ({ type, display, text, hideAlert }) => {
  const selectIcon = () => {
    switch (type) {
      case 'info':
        return (
          <img
            src={infoIcon}
            width={20}
            height={20}
            alt="info icon for alert"
          />
        );
      case 'danger':
        return (
          <img
            src={errorIcon}
            width={20}
            height={20}
            alt="error icon for alert"
          />
        );
      case 'success':
        return (
          <img
            src={successIcon}
            width={20}
            height={20}
            alt="success icon for alert"
          />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      hideAlert();
    }, 5000);
  });

  return (
    <div className={`alert alert-${type} alert-${display}`}>
      <div className="flex gap-2 items-start">
        {selectIcon()}
        <p>{text}</p>
      </div>
      <button className="border-0 p-0">&times;</button>
    </div>
  );
};

export default Alert;

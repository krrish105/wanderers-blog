const Alert = ({ type, display, text }) => {
  return (
    <div className={`alert alert-${type} alert-${display}`}>
      <p>{text}</p>
      <button>X</button>
    </div>
  );
};

export default Alert;

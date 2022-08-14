const InputComponent = ({
  id,
  type,
  label,
  value,
  inputHandler,
  minLength,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xl">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="text-black py-1 text-lg px-3"
        required={true}
        value={value}
        onInput={inputHandler}
        minLength={minLength ? minLength : 0}
      />
    </div>
  );
};

export default InputComponent;

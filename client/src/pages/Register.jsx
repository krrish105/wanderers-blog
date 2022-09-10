import InputComponent from '../components/InputComponent';
import { useState, useEffect } from 'react';
import RegisterFlowLayout from '../components/RegisterFlowLayout';
import axios from 'axios';
import useLocalState from '../utils/localState';
import { useGlobalContext } from '../utils/contextHook';
import Alert from '../components/Alert';

const Register = ({ error, setError }) => {
  const { saveUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();
  const inputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, email, password } = formData;
    const registerUser = { name, email, password };
    try {
      const { data } = await axios.post('/auth/register', registerUser);
      if (data && data.status === 'Registered') {
        setSuccess(true);
        setFormData({ name: '', email: '', password: '' });
        showAlert({
          text: `Please verify your email`,
          type: 'success',
        });
        saveUser(data.tokenUser);
      }
    } catch (error) {
      const { message } = error.response.data;
      showAlert({ text: message || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Register | Wanderer's Blog";
  }, []);

  return (
    <>
      {alert.show && (
        <Alert
          type={alert.type}
          display={alert.show}
          text={alert.text}
          hideAlert={hideAlert}
        />
      )}
      <RegisterFlowLayout title={Register}>
        <form
          action="/auth/register"
          method="post"
          onSubmit={submitHandler}
          className={`${loading}`}
        >
          <InputComponent
            id="name"
            type="text"
            label="Name:"
            value={formData.name}
            inputHandler={inputHandler}
            minLength={2}
            maxLength={50}
            placeholder="John Doe"
          />
          <InputComponent
            id="email"
            type="email"
            label="Email:"
            value={formData.email}
            inputHandler={inputHandler}
          />
          <InputComponent
            id="password"
            type="password"
            label="Password:"
            value={formData.password}
            inputHandler={inputHandler}
          />
          <button type="submit">Sign Up</button>
        </form>
      </RegisterFlowLayout>
    </>
  );
};

export default Register;

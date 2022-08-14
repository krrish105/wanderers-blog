import InputComponent from '../components/InputComponent';
import { useState } from 'react';
import LoginPageRight from '../components/LoginPageRight';
import axios from 'axios';
import useLocalState from '../utils/localState';
import { useGlobalContext } from '../utils/contextHook';

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
      setSuccess(true);
      setFormData({ name: '', email: '', password: '' });
      showAlert({ text: data.msg, type: 'success' });
      saveUser(data.tokenUser);
      if (data && data.msg === 'Registered') {
        window.location = '/';
      }
    } catch (error) {
      const { msg } = error.response.data;
      showAlert({ text: msg || 'there was an error' });
    }
    setLoading(false);
  };

  return (
    <main className="login-register-container">
      <div>
        <div className="login-register-heading">Register</div>
        <div>
          <form action="/auth/register" method="post" onSubmit={submitHandler}>
            <InputComponent
              id="name"
              type="text"
              label="Name:"
              value={formData.name}
              inputHandler={inputHandler}
              minLength={3}
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
        </div>
      </div>
      <LoginPageRight />
    </main>
  );
};

export default Register;

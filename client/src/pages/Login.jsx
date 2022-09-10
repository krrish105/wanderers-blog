import { useState, useEffect } from 'react';
import InputComponent from '../components/InputComponent';
import RegisterFlowLayout from '../components/RegisterFlowLayout';
import axios from 'axios';
import { useGlobalContext } from '../utils/contextHook';
import useLocalState from '../utils/localState';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';

const Login = () => {
  const { isLoading, user, saveUser } = useGlobalContext();
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
    const { email, password } = formData;
    const loginUser = { email, password };
    if (!email || !password) {
      return false;
    }
    try {
      const { data } = await axios.post('/auth/login', loginUser);
      if (data && data.status === 'Logged In') {
        setFormData({ email: '', password: '' });
        showAlert({
          text: `Welcome ${data.tokenUser.username}. Redirecting to HomePage...`,
          type: 'success',
        });
        setLoading(false);
        saveUser(data.tokenUser);
        window.location = '/';
      }
    } catch (error) {
      const { message } = error.response.data;
      showAlert({ text: message || 'there was an error', type: 'danger' });
    }
  };

  useEffect(() => {
    document.title = "Login | Wanderer's Blog";
    if (!isLoading) {
      if (user) {
        window.location = '/';
      }
    }
  }, [isLoading]);

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
      <RegisterFlowLayout title={Login}>
        <form
          action="/auth/login"
          method="POST"
          onSubmit={submitHandler}
          className={`${loading}`}
        >
          <InputComponent
            id="email"
            type="email"
            label="Email:"
            value={formData.email}
            inputHandler={inputHandler}
            placeholder="example@email.com"
            isRequired={true}
            autoComplete={true}
          />
          <InputComponent
            id="password"
            type="password"
            label="Password:"
            value={formData.password}
            inputHandler={inputHandler}
            isRequired={true}
            minLength={8}
          />
          <button type="submit">Login</button>
          <Link to="/user/forgot-password" className="underline text-lg">
            Forgot password?
          </Link>
        </form>
      </RegisterFlowLayout>
    </>
  );
};

export default Login;

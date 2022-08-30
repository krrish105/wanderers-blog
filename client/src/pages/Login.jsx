import { useState, useEffect } from 'react';
import InputComponent from '../components/InputComponent';
import RegisterFlowLayout from '../components/RegisterFlowLayout';
import axios from 'axios';
import { useGlobalContext } from '../utils/contextHook';
import useLocalState from '../utils/localState';
import { Link } from 'react-router-dom';

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
      const { msg } = error.response.data;
      showAlert({ text: msg || 'there was an error', type: 'danger' });
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
    <RegisterFlowLayout title={Login}>
      <form action="/auth/login" method="POST" onSubmit={submitHandler}>
        <InputComponent
          id="email"
          type="email"
          label="Email:"
          value={formData.email}
          inputHandler={inputHandler}
          placeholder="example@email.com"
          isRequired={true}
        />
        <InputComponent
          id="password"
          type="password"
          label="Password:"
          value={formData.password}
          inputHandler={inputHandler}
          isRequired={true}
        />
        <button type="submit">Login</button>
        <Link to="/user/reset-password" className="underline text-lg">
          Forgot password?
        </Link>
      </form>
    </RegisterFlowLayout>
  );
};

export default Login;

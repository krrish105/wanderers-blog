import { useState } from 'react';
import InputComponent from '../components/InputComponent';
import LoginPageRight from '../components/LoginPageRight';
import axios from 'axios';
import { useGlobalContext } from '../utils/contextHook';
import useLocalState from '../utils/localState';

const Login = () => {
  const { saveUser } = useGlobalContext();
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
    try {
      const { data } = await axios.post('/auth/login', loginUser);
      console.log(data);
      if (data && data.msg === 'Logged In') {
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
      window.location = '/error';
    }
  };

  return (
    <main className="login-register-container">
      <div>
        <div className="login-register-heading">Login</div>
        <div>
          <form action="/auth/login" method="POST" onSubmit={submitHandler}>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <LoginPageRight />
    </main>
  );
};

export default Login;

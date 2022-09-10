import { useEffect, useState } from 'react';
import InputComponent from '../components/InputComponent';
import useLocalState from '../utils/localState';
import { useGlobalContext } from '../utils/contextHook';
import axios from 'axios';
import Alert from '../components/Alert';

const ForgotPassword = () => {
  const { isLoading, user, saveUser } = useGlobalContext();
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [formData, setFormData] = useState({
    email: '',
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
    const { email } = formData;
    const resetUser = { email };

    try {
      const { data } = await axios.post('/auth/forgot-password', resetUser);
      if (data) {
        setFormData({ email: '' });
        setLoading(false);
        showAlert({
          text: data.status,
          type: 'success',
        });
        saveUser(data.tokenUser);
      }
    } catch (error) {
      const { message } = error.response.data;
      showAlert({ text: message || 'there was an error', type: 'danger' });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setFormData((prev) => ({
          ...prev,
          email: user.email,
        }));
      }
    }
  }, [isLoading]);

  useEffect(() => {
    document.title = "Forgot Password | Wanderer's Blog";
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
      <div className="container mx-auto w-fit absolute-center">
        <h2 className="text-4xl mb-7">Forgot password</h2>
        <form
          action=""
          method="post"
          onSubmit={submitHandler}
          className={`flex-col-direction forgot-password-form ${loading}`}
        >
          <InputComponent
            id="email"
            isRequired={true}
            type="email"
            label="Email : "
            value={formData.email}
            inputHandler={inputHandler}
          />
          <button type="submit" className="text-xl mt-6">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;

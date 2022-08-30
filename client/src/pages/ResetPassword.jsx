import { useEffect, useState } from 'react';
import InputComponent from '../components/InputComponent';
import useLocalState from '../utils/localState';
import { useGlobalContext } from '../utils/contextHook';
import axios from 'axios';

const ResetPassword = () => {
  const { isLoading, user, saveUser } = useGlobalContext();
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
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
    const { email, oldPassword, newPassword } = formData;
    const resetUser = { email, oldPassword, newPassword };

    try {
      const { data } = await axios.post('/auth/reset-password', resetUser);
      if (data && data.status === 'Password updated') {
        setFormData({ email: '', oldPassword: '', newPassword: '' });
        showAlert({
          text: `Password updated. Redirecting to homepage...`,
          type: 'success',
        });
        setLoading(false);
        saveUser(data.tokenUser);
        window.location = '/';
      }
    } catch (error) {
      console.log(error);
      // window.location = '/error';
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

  return (
    <div className="container mx-auto w-fit absolute-center">
      <h2 className="text-4xl mb-7">Reset password</h2>
      <form
        action=""
        method="post"
        onSubmit={submitHandler}
        className="flex-col-direction gap-5 w-[60vw] max-w-xl"
      >
        <InputComponent
          id="email"
          isRequired={true}
          type="email"
          label="Email : "
          value={formData.email}
          inputHandler={inputHandler}
        />
        <InputComponent
          id="oldPassword"
          isRequired={true}
          type="text"
          label="Old Password : "
          value={formData.oldPassword}
          inputHandler={inputHandler}
        />
        <InputComponent
          id="newPassword"
          isRequired={true}
          type="text"
          label="New Password : "
          value={formData.newPassword}
          inputHandler={inputHandler}
        />
        <button type="submit" className="border text-xl py-1 mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

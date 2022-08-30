import defaultPic from '../assets/default.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputComponent from '../components/InputComponent';
import { useGlobalContext } from '../utils/contextHook';
import useLocalState from '../utils/localState';

const EditUserPage = () => {
  const { isLoading, user, saveUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        window.location = '/login';
      } else {
        setFormData({
          name: user.name,
          email: user.email,
          description: user.description,
        });
        const textareaElement = document.getElementById('description');
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
    }
  }, [isLoading, formData.description]);

  const inputHandler = (e) => {
    if (e.target.type === 'textarea') {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, email, description } = formData;
    const updatedUser = { name, email, description };
    try {
      const { data } = await axios.patch(
        '/api/v1/user/' + user._id,
        updatedUser
      );
      if (data && data.status === 'Updated User') {
        setFormData({ name: '', email: '', password: '' });
        showAlert({
          text: `Updated ${data.user.username}'s profile. Redirecting to HomePage...`,
          type: 'success',
        });
        setLoading(false);
        saveUser(data.user);
        window.location = '/';
      }
    } catch (error) {
      showAlert({
        text: `${error.response.data.msg}`,
        type: 'danger',
      });
    }
  };

  return (
    <main className="container mx-auto w-full my-16 px-4 md:px-0">
      {isLoading ? (
        <div>'Loading....'</div>
      ) : (
        <>
          <form
            method="patch"
            onSubmit={submitHandler}
            className="edit-user-container"
          >
            <div className="flex-col-direction gap-4 mr-4">
              <img src={defaultPic} alt="" className="w-fit mx-auto" />
              <InputComponent
                id="name"
                name="name"
                type="text"
                label="Name: "
                value={formData.name}
                inputHandler={inputHandler}
                minLength={3}
                maxLength={50}
              />
              <InputComponent
                id="email"
                name="email"
                type="email"
                label="Email: "
                value={formData.email}
                inputHandler={inputHandler}
              />
            </div>
            <div>
              <InputComponent
                id="description"
                name="description"
                type="text"
                label="About : "
                value={formData.description}
                inputHandler={inputHandler}
                isTextArea={true}
                rows={10}
              />
              <div className="user-info-actions gap-5 mt-4">
                <button type="submit" className="w-full">
                  Save
                </button>
                <button className="w-full">Cancel</button>
              </div>
            </div>
          </form>
        </>
      )}
    </main>
  );
};

export default EditUserPage;

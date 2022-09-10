import useLocalState from '../utils/localState';
import axios from 'axios';
import UserInfo from '../components/UserInfoTab';
import { useState, useEffect } from 'react';
import defaultPic from '../assets/default.jpg';
import { useGlobalContext } from '../utils/contextHook';
import { useParams } from 'react-router-dom';
import UserTabs from '../components/UserTabs';
import UserBlogsTab from '../components/UserBlogsTab';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

const UserPage = () => {
  const { user } = useGlobalContext();
  const { id, section } = useParams();
  const [isMainUser, setIsMainUser] = useState(user._id === id);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [userData, setuserData] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);

  const getUser = async () => {
    hideAlert();
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/user/' + id);
      setuserData(data.user);
      hideAlert();
    } catch (error) {
      const { message } = error.response.data;
      showAlert({ text: message || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  const confirmHandler = async () => {
    try {
      hideAlert();
      setLoading(true);
      const { data } = await axios.delete('/api/v1/user/' + userData._id);
      if (data?.status === 'Account Deleted') {
        setDeleteUser(false);
        setLoading(false);
        window.location = '/';
      }
    } catch (error) {
      const { message } = error.response.data;
      showAlert({ text: message || 'there was an error', type: 'danger' });
      setLoading(false);
    }
  };

  const deleteUserHandler = async () => {
    setDeleteUser(true);
  };
  const closeHandler = () => {
    setDeleteUser(false);
  };

  useEffect(() => {
    if (user._id === id) {
      setIsMainUser(true);
    }
    if (isMainUser) {
      setLoading(false);
      setuserData(user);
    } else {
      getUser();
    }
  }, [id]);

  useEffect(() => {
    if (userData && userData?.name) {
      document.title = `${userData.name} || Wanderer's Blog`;
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userData) {
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
        <main className="container flex justify-start my-20 gap-14 flex-col md:flex-row px-4 md:px-0">
          <UserTabs
            imgUrl={defaultPic}
            isMainUser={isMainUser}
            user={userData._id}
          />
          {section === 'user-info' ? (
            <UserInfo
              id={id}
              userdata={userData}
              isMainUser={isMainUser}
              deleteUserHandler={deleteUserHandler}
            />
          ) : (
            <UserBlogsTab blogs={userData.blogs} isPersonalPage={isMainUser} />
          )}
        </main>
        <Modal
          show={deleteUser}
          close={closeHandler}
          text="Are you confirm that you want to delete your account?"
          title=""
          confirm={confirmHandler}
        />
      </>
    );
  }
};

export default UserPage;

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

const UserPage = () => {
  const { user, isLoading } = useGlobalContext();
  const { id } = useParams();
  const [isMainUser, setIsMainUser] = useState(false);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [userData, setuserData] = useState({});
  const [tabName, setTabName] = useState('user-info');
  const [response, setResponse] = useState('');
  const [deleteUser, setDeleteUser] = useState(false);

  const getUser = async () => {
    hideAlert();
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/user/' + id);
      setuserData(data.user);
      hideAlert();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const tabHandler = (e) => {
    setTabName(e.target.value);
    return;
  };

  const confirmHandler = async (e) => {
    setResponse(e.target.value);
    try {
      if (response === 'CONFIRM') {
        hideAlert();
        setLoading(true);
        await axios.delete('/api/v1/user/' + userData._id);
        setDeleteUser(false);
        setLoading(false);
        window.location = '/';
      }
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  const deleteUserHandler = async () => {
    setDeleteUser(true);
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        window.location = '/login';
      } else {
        if (user._id === id) {
          setIsMainUser(true);
        }
        if (isMainUser) {
          setuserData(user);
        } else {
          getUser();
        }
      }
    }
  }, [user, id]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (userData) {
    return (
      <>
        <main className="container flex justify-start my-20 gap-14 flex-col md:flex-row px-4 md:px-0">
          <UserTabs
            imgUrl={defaultPic}
            isMainUser={isMainUser}
            tabHandler={tabHandler}
          />
          {tabName === 'user-info' ? (
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
          close={setDeleteUser}
          text="Are you confirm that you want to delete your account?"
          title=""
          setResponse={setResponse}
          confirm={confirmHandler}
        />
      </>
    );
  }
};

export default UserPage;

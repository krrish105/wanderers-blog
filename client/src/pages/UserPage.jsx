import useLocalState from '../utils/localState';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const user = useParams();
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [userData, setUserData] = useState({});

  const viewProfileHandler = async () => {
    try {
      hideAlert();
      setLoading(true);
      const { data } = await axios.get('/api/v1/user/' + user.id);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  useEffect(() => {
    viewProfileHandler();
  }, []);

  return (
    <div>
      <div>UserPage</div>
      <div>Email: {userData.email}</div>
      <div>Name: {userData.name}</div>
    </div>
  );
};

export default UserPage;

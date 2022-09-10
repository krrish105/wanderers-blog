import { useLocation, Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/contextHook';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { isLoading } = useGlobalContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
      setMessage(data.status);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, [isLoading]);

  useEffect(() => {
    document.title = `Verify Email`;
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return (
      <div>There was an error, please double check your verification link.</div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2>{message}</h2>
      <Link to="/login">Please login</Link>
    </div>
  );
};

export default VerifyEmail;

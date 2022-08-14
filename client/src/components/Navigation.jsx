import axios from 'axios';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/contextHook';

const Navigation = ({ token }) => {
  const { user } = useGlobalContext();

  return (
    <nav className="container mx-auto flex justify-between relative items-center">
      <Link to="/" className="text-xl">
        Wanderer's Blog
      </Link>
      {user ? (
        <UserOptions />
      ) : (
        <div className="register-options py-3">
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
        </div>
      )}
    </nav>
  );
};

const UserOptions = () => {
  const { user, logoutUser } = useGlobalContext();

  return (
    <>
      <div className="rounded-md peer block py-2">
        <i className="bi bi-person-square text-white text-2xl"></i>
      </div>
      <div className="user-menu hidden peer-hover:flex hover:flex">
        <Link to={`/user/${user.userID}`}>View Profile</Link>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </>
  );
};

export default Navigation;

import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/contextHook';

const Navigation = () => {
  const { user } = useGlobalContext();

  return (
    <nav className="sticky top-0 z-50 w-full px-4 h-12 border-b-2">
      <div className="container mx-auto flex-justify-between items-center relative">
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
      </div>
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
        <Link to={`/user/${user._id}/user-info`}>View Profile</Link>
        <button onClick={logoutUser} className="border-0">
          Logout
        </button>
      </div>
    </>
  );
};

export default Navigation;

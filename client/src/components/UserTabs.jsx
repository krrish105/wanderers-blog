import { Link } from 'react-router-dom';

const UserTabs = ({ imgUrl, isMainUser, tabHandler }) => {
  return (
    <div className="w-fit static md:sticky h-fit top-14">
      <img src={imgUrl} alt="" className="mb-5 h-96 w-[32rem] max-w-sm" />
      <div className="flex-col-direction items-start text-xl gap-3">
        <button
          value="user-info"
          className="hover:border-l-2"
          onClick={tabHandler}
        >
          Profile
        </button>
        <button value="user-blogs" onClick={tabHandler}>
          Blogs
        </button>
        {isMainUser && <Link to="/user/reset-password">Change password</Link>}
      </div>
    </div>
  );
};

export default UserTabs;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultBlog from '../assets/default-blog.jpg';
import deleteIcon from '../assets/delete-icon.svg';
import Modal from './Modal';
import useLocalState from '../utils/localState';
import axios from 'axios';
import Alert from '../components/Alert';

const BlogCard = ({ blog, isMainUser }) => {
  const [showModal, setShowModal] = useState(false);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const deleteBlogHandler = async (e) => {
    setShowModal(false);
    try {
      hideAlert();
      setLoading(true);
      const { data } = await axios.delete('/api/v1/blogs/' + blog._id);
      if (data && data.status === 'deleted') {
        showAlert({
          text: `Deleted Blog.`,
          type: 'success',
        });
        setLoading(false);
        setInterval(() => {
          window.location.reload(true);
        }, 2000);
      }
    } catch (error) {
      const { message } = error.response.data;
      showAlert({ text: message || 'there was an error', type: 'danger' });
      setLoading(false);
    }
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          close={closeHandler}
          title="Delete Blog"
          text={`Are you sure you want to delete the ${blog.title} blog?`}
          confirm={deleteBlogHandler}
        />
      )}
      {alert.show && (
        <Alert
          type={alert.type}
          display={alert.show}
          text={alert.text}
          hideAlert={hideAlert}
        />
      )}
      <div className="border relative">
        {isMainUser && (
          <button
            className="absolute right-3 top-3 border-0 p-0"
            onClick={() => setShowModal(true)}
          >
            <img src={deleteIcon} alt="delete blog" width={24} />
          </button>
        )}
        <img src={defaultBlog} alt="" width={350} height={400} />
        <div className="py-4 px-6 flex-col-direction gap-1">
          <Link
            to={`/blogs/${blog._id}`}
            className="text-2xl text-overflow w-fit"
            title={blog.title}
          >
            {blog.title}
          </Link>
          <h3 className="text-xl text-overflow" title={blog.locationName}>
            {blog.locationName}
          </h3>
          {blog.author.name && (
            <div className="flex-justify-between">
              <p
                className="text-lg text-overflow"
                title={`By ${blog.author.name}`}
              >
                By{' '}
                <Link
                  to={`/user/${blog.author._id}/user-info`}
                  className="text-pink-400"
                >
                  {blog.author.name}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogCard;

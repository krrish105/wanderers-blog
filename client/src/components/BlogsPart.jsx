import axios from 'axios';
import { useState, useEffect } from 'react';
import useLocalState from '../utils/localState';
import BlogCard from './BlogCard';
import Alert from './Alert';
import InputComponent from './InputComponent';
import Spinner from './Spinner';

const BlogsPart = () => {
  const [blogs, setBlogs] = useState([]);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [searchText, setSearchText] = useState('');

  const getBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/blogs');
      if (data.status === 'success' && data.length > 0) {
        setBlogs(data.data);
      }
      hideAlert();
    } catch (error) {
      showAlert({ text: error.response.data.msg });
    }
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const inputHandler = (e) => {
    console.log(e);
  };

  if (loading) {
    return <Spinner display={true} />;
  }
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
      <main className="container mx-4 md:mx-auto my-9 mb-16 h-full">
        {blogs.length > 0 ? (
          <>
            {' '}
            <div className="block max-w-xs mb-8">
              <InputComponent
                type="search"
                label="Search : "
                id="search"
                placeholder="Search for a blog"
                inputHandler={inputHandler}
                value={searchText}
              />
            </div>
            <section>
              <h2 className="text-3xl mb-8">Blogs</h2>
              <div className="gap-6 mb-9 homepage-blog-container">
                {blogs.map((el, i) => {
                  return <BlogCard key={i} blog={el} />;
                })}
              </div>
            </section>
          </>
        ) : (
          <div className="border text-3xl h-[inherit] flex justify-center items-center">
            No Blogs Found!
          </div>
        )}
      </main>
    </>
  );
};

export default BlogsPart;

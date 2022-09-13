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
    hideAlert();
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/blogs?search=' + searchText);
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
    if (searchText === '') {
      getBlogs();
    }
  }, [searchText]);

  const inputHandler = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    if (e.target.value.length > 3) {
      const filteredBlogs = blogs.filter((el, i) => {
        if (el.title.includes(searchText)) return el;
      });
      if (filteredBlogs.length > 0) {
        setBlogs(filteredBlogs);
      }
    }
  };

  if (loading) {
    return <Spinner />;
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
      <main className="container mx-auto md:mx-auto my-9">
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
          !searchText && (
            <div className="border text-3xl flex justify-center items-center h-screen">
              No Blogs Found!
            </div>
          )
        )}
      </main>
    </>
  );
};

export default BlogsPart;

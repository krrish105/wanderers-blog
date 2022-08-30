import axios from 'axios';
import { useState } from 'react';
import useLocalState from '../utils/localState';
import BlogCard from '../components/BlogCard';
import { useEffect } from 'react';

const BlogsPart = () => {
  const [blogs, setBlogs] = useState([]);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

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

  return (
    <>
      {!alert.show && loading ? (
        <div>Loading....</div>
      ) : (
        <section className="container mx-4 md:mx-auto my-9 mb-16">
          <h2 className="text-3xl mb-8">Blogs</h2>
          <div className="gap-6 mb-9 homepage-blog-container">
            {blogs.map((el, i) => {
              return <BlogCard key={i} blog={el} />;
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default BlogsPart;

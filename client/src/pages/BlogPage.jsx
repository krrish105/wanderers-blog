import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLocalState from '../utils/localState';
import axios from 'axios';

const BlogPage = () => {
  const blogID = useParams();
  const [blog, setBlog] = useState([]);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const getBlog = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/blogs/' + blogID.id);
      if (data.status === 'success' && data.blog) {
        setBlog([data.blog]);
      }
      hideAlert();
    } catch (error) {
      showAlert({ text: error.response.data.msg });
    }
    setLoading(false);
  };

  useEffect(() => {
    getBlog();
  }, []);

  useEffect(() => {
    if (blog.length > 0) {
      if (blog[0].title) document.title = `${blog[0].title} | Wanderer's Blog`;
    }
  }, [blog]);

  if (loading) {
    return (
      <>
        <div>Loading....</div>
      </>
    );
  } else if (blog) {
    return (
      <div className="container px-4 md:px-0 mx-auto my-20">
        {!alert.show && loading ? (
          <div>Loading....</div>
        ) : (
          <div className="blog-preview">
            <div className="flex-col-direction gap-2">
              <div>{blog[0].author.name}</div>
              <h2>{blog[0].title}</h2>
              <h3>{blog[0].locationName}</h3>
            </div>
            <pre className="whitespace-pre-wrap">{blog[0].blogDesc}</pre>
          </div>
        )}
      </div>
    );
  }
};

export default BlogPage;

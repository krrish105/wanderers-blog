import { useState } from 'react';
import InputComponent from '../components/InputComponent';
import axios from 'axios';
import useLocalState from '../utils/localState';

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    locationName: '',
    blogDesc: '',
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const inputHandler = (e) => {
    if (e.target.type === 'textarea') {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { title, locationName, blogDesc } = formData;
    if (!title || !locationName || !blogDesc) {
      console.log('Please provide title, location name and blog');
    }
    hideAlert();
    setLoading(true);
    const blogData = { title, locationName, blogDesc };
    try {
      const { data } = await axios.post('/api/v1/blogs/create', blogData);
      if (data && data.status === 'CREATED') {
        showAlert({
          text: `Created Blog ${data.blog.title}. Redirecting to blog page...`,
          type: 'success',
        });
        window.href = '/';
      }
    } catch (error) {
      showAlert({
        text: `${error.response.data.msg}`,
        type: 'danger',
      });
    }
    setLoading(false);
  };

  return (
    <main className="container mx-auto my-20 px-4 md:px-0">
      <div className="grid gap-6 grid-rows-2 md:grid-cols-2 md:grid-rows-none">
        <form
          action=""
          method="post"
          onSubmit={submitHandler}
          className="flex-col-direction gap-3"
        >
          {/* <input type="image" src="" alt="" /> */}
          <InputComponent
            label="Title"
            id="title"
            type="text"
            isRequired={true}
            value={formData.title}
            inputHandler={inputHandler}
          />
          <InputComponent
            label="Location"
            id="locationName"
            type="text"
            isRequired={true}
            value={formData.locationName}
            inputHandler={inputHandler}
          />
          <InputComponent
            label="Article"
            id="blogDesc"
            isRequired={true}
            isTextArea={true}
            value={formData.blog}
            inputHandler={inputHandler}
            rows={14}
          />
          <button type="submit" className="border py-1 px-4 mt-7 w-full">
            Submit
          </button>
        </form>
        <div className="blog-preview border p-7">
          <div className="flex-col-direction gap-2">
            <h2>{formData.title}</h2>
            <h3>{formData.locationName}</h3>
          </div>
          <pre className="whitespace-pre-wrap">{formData.blogDesc}</pre>
        </div>
      </div>
    </main>
  );
};

export default CreateBlogPage;

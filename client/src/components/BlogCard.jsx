import { Link } from 'react-router-dom';
import defaultBlog from '../assets/default-blog.jpg';

const BlogCard = ({ blog }) => {
  return (
    <div className="border">
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
              <Link to={`/user/${blog.author._id}`} className="text-pink-400">
                {blog.author.name}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

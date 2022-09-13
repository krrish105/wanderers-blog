import { useEffect } from 'react';
import BlogsPart from '../components/BlogsPart';

const HomePage = () => {
  useEffect(() => {
    document.title = "Wanderer's Blog";
  }, []);

  return (
    <div className="w-full h-full mb-[4.5rem] px-4 md:px-0">
      <BlogsPart />
    </div>
  );
};

export default HomePage;

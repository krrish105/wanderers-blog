import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex-col-direction items-center h-screen">
      <Navigation />
      <Outlet />
      <footer className="py-4 w-full flex-center-content sticky top-[100vh] border-t-[1px]">
        <p>Made with ❤️ by Karishma Garg</p>
      </footer>
    </div>
  );
};

export default Layout;

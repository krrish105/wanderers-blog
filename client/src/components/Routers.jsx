import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import EditUserPage from '../pages/EditUserPage';
import VerifyEmail from '../pages/VerifyEmail';
import BlogPage from '../pages/BlogPage';
import UserPage from '../pages/UserPage';
import CreateBlogPage from '../pages/CreateBlogPage';
import ResetPassword from '../pages/ResetPassword';
import PrivateRoute from './ProtectedRoutes';
import ForgotPassword from '../pages/ForgotPassword';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            exact
            path="/user/verify-email"
            element={<VerifyEmail />}
          ></Route>
          <Route
            exact
            path="/user/:id/edit"
            element={
              <PrivateRoute>
                <EditUserPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/user/:id/:section"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/user/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route
            exact
            path="/user/reset-password"
            element={<ResetPassword />}
          ></Route>
          <Route exact path="/blogs/:id" element={<BlogPage />}></Route>
          <Route
            exact
            path="/create/blog"
            element={
              <PrivateRoute>
                <CreateBlogPage />
              </PrivateRoute>
            }
          ></Route>
        </Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/error" element={<ErrorPage />}></Route>
        <Route
          exact
          path="*"
          element={<ErrorPage notFoundPage={true} />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default Routers;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import NotFoundPage from '../pages/NotFoundPage';
import UserPage from '../pages/UserPage';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route exact path="/user/:id" element={<UserPage />}></Route>
        </Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/error" element={<ErrorPage />}></Route>
        <Route exact path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
};

export default Routers;

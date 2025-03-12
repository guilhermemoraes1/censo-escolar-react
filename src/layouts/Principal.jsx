import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';

const Principal = () => {
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Principal;

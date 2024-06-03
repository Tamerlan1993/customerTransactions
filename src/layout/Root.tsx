import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Root = () => {
  return (
    <div className='w-75 mx-auto'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;

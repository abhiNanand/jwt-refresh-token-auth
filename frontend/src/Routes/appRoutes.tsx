import {createBrowserRouter} from 'react-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ErrorPage from '../components/ErrorPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    //title: 'Home',
  },
  {
    path: '/login',
    element: <Login/>,

  },
  {
    path: '/signup',
    element: <Signup/>,

  },
  {
    path: '*',
    element: <ErrorPage/>,
  },
]);

export default appRouter;
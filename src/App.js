import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import { AuthContext } from './context/AuthContext';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './redux/users/userSlice';

const Home = lazy(() => import('./pages/home/home'));
const Todo = lazy(() => import('./pages/todo-list/Todo'));
const About = lazy(() => import('./pages/about/about'));
const Layout = lazy(() => import('./components/Layout/Layout'));
const NotFoundPage = lazy(() => import('./pages/not-found/not-found'));
const ErrorPage = lazy(() => import('./pages/error-page/error-page'));
const Login = lazy(() => import('./pages/login/login'));

function App() {
  const [loginUser, setLoginUser] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('email');
    if (savedUsername && savedEmail) {
      return { username: savedUsername, email: savedEmail };
    }
    return { username: '', email: '' };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('username') && !!localStorage.getItem('email')
  );
  const dispatch = useDispatch();

  // const { data: userList, isFetching } = useQuery({
  //   queryKey: ['userList'],
  //   queryFn: getAllUsers,
  //   refetchOnReconnect: false,
  //   refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path='/'
            element={
              <Layout loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          >
            <Route
              path='/login'
              element={<Login setLoginUser={setLoginUser} />}
            />
            <Route index element={<Home />} />
            <Route
              path='/todo-list'
              element={
                <PrivateRoutes>
                  <Todo />
                </PrivateRoutes>
              }
            />
            <Route
              path='/about'
              element={
                <PrivateRoutes>
                  <About />
                </PrivateRoutes>
              }
            />
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='*' element={<Navigate to='/404' />} />
            <Route path='/error-page' element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;

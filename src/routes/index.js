import Home from '../views/home/Home';
import Profile from '../views/Profile/Profile';
import Information from '../views/Information/Information';
import Login from '../views/login';
import Register from '../views/register';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/information', component: Information, layout: null },
];
// cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

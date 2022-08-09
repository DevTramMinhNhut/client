import Home from '../views/home/Home';
import Profile from '../views/Profile/Profile';
import Information from '../views/Information/Information';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/information', component: Information, layout: null },
];
// cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

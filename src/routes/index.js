import Detail from '../views/Detail';
import Home from '../views/home/Home';
import Information from '../views/Information/Information';
import Login from '../views/login';
import Register from '../views/register';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/detail/product/1', component: Detail },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/information', component: Information, layout: null },
];
// cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

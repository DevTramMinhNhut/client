import Cart from '../views/cart';
import Detail from '../views/Detail';
import Home from '../views/home/Home';
import Login from '../views/login';
import Register from '../views/register';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/detail/product/1', component: Detail },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/cart', component: Cart },
];
// cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

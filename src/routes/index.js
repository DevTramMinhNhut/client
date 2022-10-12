import Cart from '../views/cart';
import DetailProduct from '../views/detailProduct';
import DetailCategory from '../views/detailCategory';
import Home from '../views/home/Home';
import Register from '../views/register';
import SearchProduct from '../views/searchProduct';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/detail/product/:product_id', component: DetailProduct },
  { path: '/detail/categories/:category_id', component: DetailCategory },
  { path: '/search/product', component: SearchProduct },
  { path: '/register', component: Register, layout: null },
  { path: '/cart', component: Cart },
];
// cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

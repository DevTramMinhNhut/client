import Cart from '../views/cart';
import Payment from '../views/cart/payment';
import DetailProduct from '../views/detailProduct';
import DetailCategory from '../views/detailCategory';
import Home from '../views/home/Home';
import Register from '../views/register';
import SearchProduct from '../views/searchProduct';
import Introduce from '../views/home/introduce';
import Contact from '../views/home/contact';
import Support from '../views/home/support';
import ProductLike from '../views/productLike';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/gioi-thieu', component: Introduce },
  { path: '/lien-he', component: Contact },
  { path: '/ho-tro', component: Support },
  { path: '/product-like', component: ProductLike },
  { path: '/detail/product/:product_id', component: DetailProduct },
  { path: '/detail/categories/:category_id', component: DetailCategory },
  { path: '/search/product', component: SearchProduct },
  { path: '/register', component: Register, layout: null },
  { path: '/cart', component: Cart },
  { path: '/cart/payment', component: Payment, layout: null },
];
// cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

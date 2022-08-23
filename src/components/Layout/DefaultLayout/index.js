import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.css';
import classNames from 'classnames/bind';
import Footer from './Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('default-wrapper')}>
      <Header />
      <div className={cx('default-container')}>
        <Sidebar />
        <div className={cx('default-content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;

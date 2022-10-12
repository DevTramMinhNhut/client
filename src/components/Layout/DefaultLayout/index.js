import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.css';
import classNames from 'classnames/bind';
import Footer from './Footer';
import { createContext, useState } from 'react';

const cx = classNames.bind(styles);

export const onClickCheckCart = createContext();
export const checkCart = createContext();

function DefaultLayout({ children }) {
  const [check, setCheck] = useState(false);
  const onClickCart = () => {
    setCheck(!check);
  };
  return (
    <onClickCheckCart.Provider value={onClickCart}>
      <checkCart.Provider value={check}>
        <div className={cx('default-wrapper')}>
          <Header />
          <div className={cx('default-container')}>
            <Sidebar />
            <div className={cx('default-content')}>{children}</div>
          </div>
          <Footer />
        </div>
      </checkCart.Provider>
    </onClickCheckCart.Provider>
  );
}

export default DefaultLayout;

import styles from './Sidebar.css';
import classNames from 'classnames/bind';
import { AiOutlineMenu } from 'react-icons/ai';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';

//api
import Loadpage from '../.././../loadpage/Loadpage';
import * as categoryApi from '../../../../api/category';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await categoryApi.get('categories');
      setCategory(data.categories);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  if (loading) return <Loadpage />;
  else
    return (
      <>
        <aside className={cx('default-sidebar-wrapper')}>
          <ListGroup className={cx('default-sidebar-menu')}>
            <ListGroup.Item>
              <AiOutlineMenu className={cx('default-sidebar-menu-icon')} />
              DANH MỤC SẢN PHẨM
            </ListGroup.Item>
            {category.map((category, index) => {
              return (
                <Link
                  className={cx('default-sidebar-menu-link')}
                  key={index}
                  to={`/detail-category/${category.category_id}`}
                >
                  <ListGroup.Item className={cx('item-menu')}>{category.category_name}</ListGroup.Item>
                </Link>
              );
            })}
          </ListGroup>
        </aside>
      </>
    );
}

export default Sidebar;

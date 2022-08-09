import styles from './Sidebar.css';
import classNames from 'classnames/bind';
import { AiOutlineMenu } from 'react-icons/ai';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('default-sidebar-wrapper')}>
      <ListGroup className={cx('default-sidebar-menu')}>
        <ListGroup.Item>
          <AiOutlineMenu className={cx('item-menu')} />
          DANH MỤC SẢN PHẨM
        </ListGroup.Item>
        <ListGroup.Item>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Coca Cola</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
    </aside>
  );
}

export default Sidebar;

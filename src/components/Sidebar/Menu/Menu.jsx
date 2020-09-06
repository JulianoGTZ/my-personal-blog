import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './Menu.module.scss';

const Menu = ({ menu }) => (
  <nav data-testid="menu-navbar" className={styles.menu}>
    <ul data-testid="menu-items" className={styles.menu__list}>
      {menu.map((item, index) => (
        <li
          id={`${item.path}-${index}`}
          className={styles['menu__list-item']}
          key={item.path}
        >
          <Link
            to={item.path}
            data-testid={`menu-list-item-${index}`}
            className={styles['menu__list-item-link']}
            activeClassName={styles['menu__list-item-link--active']}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

Menu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Menu;

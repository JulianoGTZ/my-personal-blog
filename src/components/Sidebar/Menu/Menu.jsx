import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { menu as menu_style, menu__list, menu__listItem, menu__listItemLink, menu__listItemLinkActive } from './Menu.module.scss';


const Menu = ({ menu }) => (
  <nav data-testid="menu-navbar" className={menu_style}>
    <ul data-testid="menu-items" className={menu__list}>
      {menu.map((item, index) => (
        <li
          id={`${item.path}-${index}`}
          className={menu__listItem}
          key={item.path}
        >
          <Link
            to={item.path}
            data-testid={`menu-list-item-${index}`}
            className={menu__listItemLink}
            activeClassName={menu__listItemLinkActive}
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

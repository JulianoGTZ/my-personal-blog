import React from 'react';
import PropTypes from 'prop-types';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import { sidebar, sidebar__inner} from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

const Sidebar = ({ isIndex }) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={sidebar} data-testid="sidebar">
      <div className={sidebar__inner}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  isIndex: false,
};

Sidebar.propTypes = {
  isIndex: PropTypes.bool,
};

export default Sidebar;

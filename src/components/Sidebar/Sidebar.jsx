import React from 'react';
import PropTypes from 'prop-types';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

const Sidebar = ({ isIndex }) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__inner}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isIndex: PropTypes.bool.isRequired,
};

export default Sidebar;
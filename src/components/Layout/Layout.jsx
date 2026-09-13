import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';

// Document head lives in each template's `Head` export now (see components/Seo),
// which is why this component no longer renders anything into it.
const Layout = ({ children }) => (
  <div className={styles.layout} data-testid="layout-image">
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;

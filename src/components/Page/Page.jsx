import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Page.module.scss';

const Page = ({ title, children }) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  }, []);

  return (
    <div data-testid="page-container" ref={pageRef} className={styles.page}>
      <div className={styles.page__inner}>
        {title && <h1 data-testid="page-title" className={styles.page__title}>{title}</h1>}
        <div data-testid="page-body" className={styles.page__body}>
          {children}
        </div>
      </div>
    </div>
  );
};

Page.defaultProps = {
  children: null,
  title: undefined,
};

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Page;

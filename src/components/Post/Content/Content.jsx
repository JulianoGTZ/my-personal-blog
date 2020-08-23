import React from 'react';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';

const Content = ({ body, title }) => (
  <div className={styles.content}>
    <h1 className={styles.content__title}>{title}</h1>
    <div
      className={styles.content__body}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

Content.propTypes = {
  body: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Content;
